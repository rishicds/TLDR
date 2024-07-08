"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Inbox, Loader2, Link } from "lucide-react";
import { uploadToS3 } from "@/lib/s3";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PDFDocument } from 'pdf-lib';

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
const ACCEPTED_FILE_TYPES = { "application/pdf": [".pdf"] };

const CORS_PROXY = "https://cors.bridged.cc/";

const FileUpload: React.FC = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      const response = await axios.post("/api/create-chat", { file_key, file_name });
      return response.data;
    },
    onSuccess: ({ chat_id }) => {
      toast.success("Chat created!");
      router.push(`/chat/${chat_id}`);
    },
    onError: (err) => {
      toast.error("Error creating chat");
      console.error(err);
    },
  });

  const processPDF = async (arrayBuffer: ArrayBuffer): Promise<boolean> => {
    try {
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      console.log("PDF processed successfully. Number of pages:", pdfDoc.getPageCount());
      
      const metadata = pdfDoc.getTitle();
      console.log("PDF title:", metadata);

      return true;
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error("Error processing PDF. Please try a different file.");
      return false;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large");
      return;
    }

    try {
      setUploading(true);
      const arrayBuffer = await file.arrayBuffer();
      const isValidPDF = await processPDF(arrayBuffer);
      if (!isValidPDF) return;

      const data = await uploadToS3(file);
      if (!data?.file_key || !data.file_name) {
        throw new Error("Invalid upload response");
      }
      mutate(data);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  }, [mutate]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ACCEPTED_FILE_TYPES,
    maxFiles: 1,
    onDrop,
  });

  const handleUrlUpload = async () => {
    if (!pdfUrl) {
      toast.error("Please enter a valid PDF URL");
      return;
    }

    try {
      setUploading(true);
      const response = await axios.get(`${CORS_PROXY}${pdfUrl}`, { 
        responseType: 'arraybuffer',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      const arrayBuffer = response.data;
      
      if (arrayBuffer.byteLength > MAX_FILE_SIZE) {
        toast.error("File too large");
        return;
      }

      const isValidPDF = await processPDF(arrayBuffer);
      if (!isValidPDF) return;

      const file = new File([arrayBuffer], "document.pdf", { type: "application/pdf" });
      const data = await uploadToS3(file);
      if (!data?.file_key || !data.file_name) {
        throw new Error("Invalid upload response");
      }
      mutate(data);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file from URL");
    } finally {
      setUploading(false);
    }
  };

  const content = useMemo(() => {
    if (uploading || isPending) {
      return (
        <>
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="mt-2 text-sm text-slate-400">Processing and uploading file...</p>
        </>
      );
    }
    return (
      <>
        <Inbox className="w-10 h-10 text-blue-500" />
        <p className="mt-2 text-sm text-slate-400">Drop PDF Here (Under 150MB)</p>
      </>
    );
  }, [uploading, isPending]);

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {content}
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-400 mb-2">Or add PDF using a link:</p>
        <div className="flex space-x-2">
          <Input
            type="url"
            placeholder="Enter PDF URL"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleUrlUpload} disabled={uploading || isPending}>
            <Link className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FileUpload);
