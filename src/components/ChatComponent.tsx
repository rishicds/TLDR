"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-gray-800 h-fit z-10">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
      <div 
        ref={messageContainerRef}
        className="flex-grow overflow-y-auto px-2 py-4 pb-[8rem] w-full"
        id="message-container"
      >
        <MessageList messages={messages} isLoading={isLoading} isThinking={false} />
      </div>

      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 p-2 bg-gray-800 w-full"
      >
        <div className="flex w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your question :)"
            className="flex-grow bg-gray-700 text-white placeholder-gray-400"
          />
          <Button className="bg-gradient-to-r from-blue-600 to-red-300 ml-2 whitespace-nowrap">
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;