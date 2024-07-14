"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, FileText, MessageSquare } from "lucide-react";

type MobileChatNavProps = {
  onSidebarToggle: () => void;
  onPDFToggle: () => void;
  onChatToggle: () => void;
};

const MobileChatNav: React.FC<MobileChatNavProps> = ({
  onSidebarToggle,
  onPDFToggle,
  onChatToggle,
}) => {
  return (
    <div className="lg:hidden flex justify-around bg-gray-800 p-2">
      <Button className="flex-1 mr-2" onClick={onSidebarToggle}>
        <Menu className="mr-2" />
        Chats
      </Button>
      <Button className="flex-1 mr-2" onClick={onPDFToggle}>
        <FileText className="mr-2" />
        PDF
      </Button>
      <Button className="flex-1" onClick={onChatToggle}>
        <MessageSquare className="mr-2" />
        Chat
      </Button>
    </div>
  );
};

export default MobileChatNav;