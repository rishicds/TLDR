"use client";
import React, { useState } from 'react';
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState(chats);

  const deleteChat = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.delete('/api/chat', { data: { chatId: id } });
      if (response.status === 200) {
        setChatList(chatList.filter(chat => chat.id !== id));
      } else {
        console.error(`Failed to delete chat: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-3 left-0 h-[calc(100vh-4rem)] w-full bg-gray-900 md:pt-4 relative md:w-64 md:h-full flex flex-col">
      <div className="p-4">
        <Link href="/">
          <Button className="w-full bg-gradient-to-r from-red-500 to-blue-500 border-solid border-2 border-white">
            <PlusCircle className="mr-2 w-4 h-4" />
            New Chat
          </Button>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {chatList.map((chat) => (
            <div key={chat.id} className="flex items-center">
              <Link href={`/chat/${chat.id}`} className="flex-1">
                <div
                  className={cn("rounded-lg p-3 text-wrap text-slate-300 flex items-center", {
                    "bg-gradient-to-r from-blue-600 to-red-300 text-white": chat.id === chatId,
                    "hover:text-white": chat.id !== chatId,
                  })}
                >
                  <MessageCircle className="mr-2" />
                  <p className="w-full overflow-hidden text-sm truncate whitespace-wrap text-wrap">
                    {chat.pdfName}
                  </p>
                </div>
              </Link>
              <Button
                className="ml-2 bg-gradient-to-r from-red-600 to-red-500 border-solid border-2 border-white"
                onClick={() => deleteChat(chat.id)}
                disabled={loading}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
