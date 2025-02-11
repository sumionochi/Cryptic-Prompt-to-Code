import { MessageContext } from '@/lib/MessageContext'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type Props = {}

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const Chatspace = (props: Props) => {
  const params = useParams()
  const workspaceId = params.id
  const {messages, setMessages} = useContext(MessageContext);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(`/api/workspace/${workspaceId}`);
        const data = await response.json();
        setMessages(data?.message || []); // Ensure messages is always an array
      } catch (error) {
        console.error('Error fetching workspace:', error);
        setMessages([]); // Set an empty array on error
      }
    };

    if (workspaceId) {
      fetchWorkspace();
    }
  }, [workspaceId]);

  return (
    <div className="flex h-full border mt-2 flex-col overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index: number) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Select defaultValue="claude-3-sonnet">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claude-3-sonnet">Claude-3-Sonnet</SelectItem>
              <SelectItem value="claude-3-opus">Claude-3-Opus</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex flex-1 items-center gap-2 rounded-lg border bg-background p-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <path d="m18 16-4-4 4-4"/>
                <path d="m6 8 4 4-4 4"/>
              </svg>
            </Button>
            
            <Input
              className="flex-1 border-0 bg-transparent focus-visible:ring-0"
              placeholder="Send a message..."
            />
            
            <Button type="submit" size="icon" className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                <path d="M22 2 11 13"/>
                <path d="M22 2 15 22 11 13 2 9 22 2z"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatspace