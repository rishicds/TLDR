"use client"
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from '@clerk/nextjs';
import FileUpload from "@/components/FileUpload";

const UploadPage = () => {
  const searchParams = useSearchParams();
  const pdfLink = searchParams.get("pdfLink") || undefined;
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-500 to-blue-500">
        <p className="text-white text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to TL;DR</h1>
        <FileUpload pdfLink={pdfLink} />
      </div>
    </div>
  );
};

export default UploadPage;