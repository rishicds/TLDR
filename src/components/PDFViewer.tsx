import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <div className="w-full h-full bg-gray-900">
      <iframe
        src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
        className="w-full h-full border-none"
      ></iframe>
    </div>
  );
};

export default PDFViewer;
