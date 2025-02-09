"use client";

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import {Navbar} from '@/components/Navbar';
import { MessageContext } from '@/lib/MessageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
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
    </div>
  );
}