"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/Navbar";
import { MessageContext } from "@/lib/MessageContext";
import { UserInfoContext } from "@/lib/UserInfoContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/Chatsidebar";
import { CompileContext } from "@/lib/CompileContext";
import { useRouter } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [messages, setMessages] = useState<any>(null);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [compile, setCompile] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  // const isAuthenticated = async () => {
  //   if (typeof window !== "undefined") {
  //     const user = localStorage.getItem("user");
  //     if (!user) {
  //       router.push("/");
  //       return;
  //     }
  //   }
  // };

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetail");
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID_KEY || ""}>
      <UserInfoContext.Provider value={{ userDetail, setUserDetail }}>
        <MessageContext.Provider value={{ messages, setMessages }}>
          <CompileContext.Provider value={{ compile, setCompile }}>
            <SidebarProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ChatSidebar />
                <main className="w-full relative">
                  <SidebarTrigger className="text-black dark:text-white absolute z-30" />
                  <Navbar />
                  {children}
                </main>
              </ThemeProvider>
            </SidebarProvider>
          </CompileContext.Provider>
        </MessageContext.Provider>
      </UserInfoContext.Provider>
    </GoogleOAuthProvider>
  );
}
