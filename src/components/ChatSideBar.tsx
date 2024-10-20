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
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const deleteChat = async (id: number) => {
    try {
      setDeleteLoading(id);
      const response = await axios.delete('/api/chat', { data: { chatId: id } });
      if (response.status === 200) {
        setChatList(chatList.filter(chat => chat.id !== id));
      } else {
        console.error(`Failed to delete chat: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="fixed top-3 left-0 h-[calc(100vh-4rem)] w-full bg-gray-900 md:pt-4 relative md:w-64 md:h-full flex flex-col shadow-xl">
      <div className="p-4">
        <Link href="/">
          <Button 
            className="w-full h-12 bg-gradient-to-r from-red-500 to-blue-500 border-solid border-2 border-white hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-blue-500/20 group"
          >
            <PlusCircle className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-semibold">New Chat</span>
          </Button>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="flex flex-col gap-2">
          {chatList.map((chat) => (
            <div 
              key={chat.id} 
              className="flex items-center group h-12"
            >
              <Link href={`/chat/${chat.id}`} className="flex-1 h-full">
                <div
                  className={cn(
                    "h-full rounded-lg px-3 text-slate-300 flex items-center transition-all duration-200",
                    "hover:shadow-lg relative overflow-hidden",
                    {
                      "bg-gradient-to-r from-blue-600 to-red-300 text-white shadow-md": chat.id === chatId,
                      "hover:bg-gray-800 hover:text-white": chat.id !== chatId,
                    }
                  )}
                >
                  <MessageCircle className={cn(
                    "mr-2 transition-transform duration-200 flex-shrink-0",
                    chat.id === chatId ? "text-white" : "text-gray-400",
                    "group-hover:scale-110"
                  )} />
                  <p className="w-full overflow-hidden text-xs truncate font-medium">
                    {chat.pdfName}
                  </p>
                </div>
              </Link>

              <Button
                className={cn(
                  "ml-2 h-full aspect-square p-0 bg-gradient-to-r from-red-600 to-red-500 border-solid border-2 border-white",
                  "transition-all duration-200 hover:opacity-90 shadow-md hover:shadow-red-500/20",
                  "opacity-0 group-hover:opacity-100",
                  deleteLoading === chat.id && "animate-pulse"
                )}
                onClick={() => deleteChat(chat.id)}
                disabled={deleteLoading !== null}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {isPro && (
        <div className="p-4 mt-auto">
          <div className="h-12 rounded-lg bg-gradient-to-r from-blue-600/30 to-red-300/30 p-4 text-white text-sm flex items-center">
            <p className="font-semibold">Pro Plan Active</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSideBar;