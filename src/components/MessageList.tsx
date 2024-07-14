import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2, MessageSquare } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin text-white" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <MessageSquare className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">No messages yet</p>
        <p className="text-sm">Start a new conversation by typing below!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        const userMessageStyle = {
          backgroundImage: "linear-gradient(to right, #EF4444, #2563EB)",
        };

        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1",
                {
                  "bg-gradient-to-r from-red-600 to-blue-500 text-white ring-red-700/50": message.role === "user",
                  "bg-gray-800 text-gray-300 ring-gray-700/50": message.role === "assistant",
                }
              )}
              style={message.role === "user" ? userMessageStyle : {}}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;