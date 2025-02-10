"use client";

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import {Navbar} from '@/components/Navbar';
import { MessageContext } from '@/lib/MessageContext';
import { UserInfoContext } from '@/lib/UserInfoContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Providers({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any>();
  const [userDetail, setUserDetail] = useState<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('userDetail');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID_KEY || ""}>
        <UserInfoContext.Provider value={{ userDetail, setUserDetail }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
              <Navbar />
              {children}
            </ThemeProvider>
          </MessageContext.Provider>
        </UserInfoContext.Provider>
      </GoogleOAuthProvider>;
    </div>
  );
}