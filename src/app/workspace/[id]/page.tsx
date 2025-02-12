"use client"

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Chatspace from '@/components/Chatspace'
import Codespace from '@/components/Codespace'

export default function WorkspacePage() {
  return (
    <div className="min-h-screen h-screen mt-16 bg-gradient-to-br from-background to-secondary text-foreground font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl opacity-50 pointer-events-none float" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl opacity-50 pointer-events-none float" style={{ animationDelay: "-3s" }} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 h-full p-4'>
        <div className="h-[92%] overflow-scroll scrollbar-hide md:col-span-1">
          <Chatspace/>
        </div>
        <div className="h-[91%] md:col-span-2">
          <Codespace/>
        </div>
      </div>
    </div>
  )
}