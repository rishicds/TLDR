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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <FileUpload pdfLink={pdfLink} />
    </div>
  );
};

export default UploadPage;
