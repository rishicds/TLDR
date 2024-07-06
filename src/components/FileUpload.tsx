"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Inbox, Loader2 } from "lucide-react";
import { uploadToS3 } from "@/lib/s3";

const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB
const ACCEPTED_FILE_TYPES = { "application/pdf": [".pdf"] };

const FileUpload: React.FC = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large");
      return;
    }

    try {
      setUploading(true);
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

  const content = useMemo(() => {
    if (uploading || isPending) {
      return (
        <>
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="mt-2 text-sm text-slate-400">Uploading file(Please delete after use)</p>
        </>
      );
    }
    return (
      <>
        <Inbox className="w-10 h-10 text-blue-500" />
        <p className="mt-2 text-sm text-slate-400">Drop PDF Here(Under 150MB)</p>
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
    </div>
  );
};

export default React.memo(FileUpload);