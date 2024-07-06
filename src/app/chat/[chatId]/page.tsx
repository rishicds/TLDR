import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscriptions";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type Props = {
  params: {
    chatId: string;
  };
};

const isMobileDevice = (userAgent: string) => {
  const mobileDevices = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
  ];

  return mobileDevices.some((device) => userAgent.includes(device));
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const userAgent = headers().get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-black p-6 rounded shadow-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Use a Desktop or Laptop</h2>
          <p className="text-white">This page is best viewed on a desktop or laptop.(Buy premium so I make it mobile UI faster)</p>
        </div>
      </div>
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="flex flex-col h-screen lg:flex-row max-h-screen">
      <div className="flex w-full max-h-screen overflow-auto">
        {/* chat sidebar */}
        <div className="flex-none lg:w-1/5">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="flex-1 lg:w-3/5 max-h-screen p-4">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* chat component */}
        <div className="flex-1 lg:w-1/5 border-t-4 lg:border-t-0 lg:border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
