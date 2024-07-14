"use client";
import React, { useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { Button } from "@/components/ui/button";
import { Menu, FileText, MessageSquare } from "lucide-react";

type InteractiveChatLayoutProps = {
  chatId: number;
  chats: any[];
  isPro: boolean;
  pdfUrl: string;
};

const InteractiveChatLayout: React.FC<InteractiveChatLayoutProps> = ({
  chatId,
  chats,
  isPro,
  pdfUrl,
}) => {
  const [activeComponent, setActiveComponent] = useState<'sidebar' | 'pdf' | 'chat'>('chat');

  const MobileChatNav = () => (
    <div className="lg:hidden flex justify-around bg-gray-800 p-2">
      <Button className="flex-1 mr-2" onClick={() => setActiveComponent('sidebar')}>
        <Menu className="mr-2" />
        Chats
      </Button>
      <Button className="flex-1 mr-2" onClick={() => setActiveComponent('pdf')}>
        <FileText className="mr-2" />
        PDF
      </Button>
      <Button className="flex-1" onClick={() => setActiveComponent('chat')}>
        <MessageSquare className="mr-2" />
        Chat
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
      <MobileChatNav />
      
      {/* Sidebar */}
      <div className={`${activeComponent === 'sidebar' ? 'block' : 'hidden'} lg:block lg:w-1/5 bg-gray-900 overflow-y-auto`}>
        <ChatSideBar chats={chats} chatId={chatId} isPro={isPro} />
      </div>
      
      {/* PDF Viewer */}
      <div className={`${activeComponent === 'pdf' ? 'block' : 'hidden'} lg:block lg:w-3/5 overflow-y-auto h-[calc(100vh-8rem)] lg:h-auto`}>
        <PDFViewer pdf_url={pdfUrl} />
      </div>
      
      {/* Chat Component */}
      <div className={`${activeComponent === 'chat' ? 'block' : 'hidden'} lg:block flex-grow lg:w-1/3 border-t-4 lg:border-t-0 lg:border-l-4 border-slate-200`}>
        <ChatComponent chatId={chatId} />
      </div>
    </div>
  );
};

export default InteractiveChatLayout;
