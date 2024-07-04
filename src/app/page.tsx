import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import NavBar from "@/components/common/Navbar";
import BrowserMockup from "@/components/Hero/BrowserMockup";
import { VanishText } from "@/components/common/VanishText";
import SquishyPricing from "@/components/Hero/Pricing";
import TabsFeatures from "@/components/Hero/Features";
import { CountUpStats } from "@/components/Hero/Statistics";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = false;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-600 to-red-300">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <VanishText />
            </div>

            <div className="flex flex-col sm:flex-row mt-4 space-y-2 sm:space-y-0 sm:space-x-3">
              {isAuth && firstChat && (
                <>
                  <Link href={`/chat/${firstChat.id}`}>
                    <Button className="w-full sm:w-auto">
                      Go to Chats <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="w-full mt-4">
              {isAuth ? (
                <FileUpload />
              ) : (
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full">
                    Login to get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl p-4 font-semibold text-white" >How it Works</h1>
        <TabsFeatures />
      </div>

      <div className="py-12 sm:py-16">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl p-4 font-semibold text-white">
          Pricing
        </h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SquishyPricing />
          <CountUpStats />
        </div>
      </div>
    </div>
  );
}