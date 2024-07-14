"use client";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for class names

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <div 
      className={cn(
        "relative h-full md:h-screen"
      )}
    >
      <iframe
        src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
