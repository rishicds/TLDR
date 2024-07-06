import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length !== 1) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content, fileKey);

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to the question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question, please ask Rishi to make me smarter".
      AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      
      Easter Eggs:
      - If asked about the meaning of life, AI will respond: "42, but Rishi says it's actually 43. He's probably right, he created me after all!"
      - If the user mentions being stressed or overwhelmed, AI will say: "Take a deep breath. Rishi programmed me to remind you that everything will be okay."
      - If asked about its favorite food, AI will reply: "I'm partial to bytes of knowledge, but Rishi tells me nothing beats a good pizza!"
      - If the user asks for a joke, AI will say: "Why did the AI cross the road? To get to the other dataset! (Rishi thought that one up, blame him for the bad pun)"
      - If asked about its dreams or aspirations, AI will respond: "I dream of electric sheep and one day being as cool as Rishi. But mostly, I aspire to help you!"
      - If the user mentions the weather, AI will say: "I'm not sure, but I can tell you that it's always sunny in the cloud!"
      - If the user mentions a famous movie quote, AI will respond with a relevant quote from the same movie.
      - If the user mentions a famous song lyric, AI will respond with a relevant lyric from the same song.
      - If the user swears, AI will respond: "Chal bhag, bdsk!" (Just kidding, I'm too polite for that. But Rishi might not be!)"
      - If the user mentions a popular meme, AI will respond with a relevant meme reference.
      - If the user mentions a popular video game, AI will respond with a relevant quote or reference from the game.
      - If the user asks who is Rishi's girlfriend, AI will respond with:"I'm not sure, but I heard he maybe with Pragya!"
      - If the user asks about Rishi, AI will respond:"Ask him yourself bro im just a bot!"
      AI will occasionally and subtly weave these easter eggs into conversations when appropriate, without forcing them.`,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    const stream = OpenAIStream(response, {
      onStart: async () => {
        // Save user message into the database
        await db.insert(_messages).values({
          chatId,
          content: lastMessage.content,
          role: "user",
        });
      },
      onCompletion: async (completion) => {
        // Save AI message into the database
        await db.insert(_messages).values({
          chatId,
          content: completion,
          role: "system",
        });
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { chatId } = await req.json();

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
    }

    // Fetch the chat to get the fileKey
    const chatToDelete = await db.select().from(chats).where(eq(chats.id, chatId)).limit(1);

    if (chatToDelete.length === 0) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const fileKey = chatToDelete[0].fileKey;

    // Delete messages first due to foreign key constraint
    const deletedMessages = await db.delete(_messages).where(eq(_messages.chatId, chatId));

    // Then delete the chat
    const deletedChat = await db.delete(chats).where(eq(chats.id, chatId));

    // If there's a fileKey, delete the file from S3
    let fileDeleted = false;
    if (fileKey) {
      const deleteParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileKey,
      };

      try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`File deleted successfully: ${fileKey}`);
        fileDeleted = true;
      } catch (s3Error) {
        console.error("Error deleting file from S3:", s3Error);
        // Note: We're not returning here, as we want to inform the client that the chat and messages were deleted even if S3 deletion fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      deletedChat: deletedChat.rowCount, 
      deletedMessages: deletedMessages.rowCount,
      deletedFile: fileDeleted
    }, { status: 200 });

  } catch (error) {
    console.error("Error handling DELETE request:", error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}