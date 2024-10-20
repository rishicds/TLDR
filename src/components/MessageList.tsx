import React from "react";
import { Message } from "ai";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isThinking: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  isLoading,
  isThinking 
}) => {
  const filteredMessages = messages.filter(message => message.id !== 'thinking');
  const showThinking = isThinking || messages.some(msg => msg.id === 'thinking');

  return (
    <div className="space-y-4">
      {filteredMessages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex items-start gap-4 rounded-lg p-4",
            message.role === "user"
              ? "bg-blue-500 bg-opacity-10"
              : "bg-gray-800"
          )}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              message.role === "user"
                ? "bg-blue-600"
                : "bg-green-600"
            )}
          >
            <span className="text-sm font-medium text-white">
              {message.role === "user" ? "U" : "A"}
            </span>
          </div>

          <div className="flex-1">
            <div className="font-semibold mb-1">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
            <div className="text-gray-200 whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>
      ))}

      {(isLoading || showThinking) && (
        <div className="flex items-start gap-4 rounded-lg p-4 bg-gray-800">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-1">Assistant</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-200">Thinking</span>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;