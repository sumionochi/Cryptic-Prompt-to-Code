"use client"

import * as React from "react"
import { CreditCard, HelpCircle, LogOut, MessageCircle, Settings, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { UserInfoContext } from "@/lib/UserInfoContext"

// Sample chat data
const sampleChats = [
  { id: 1, title: "Project Discussion", lastMessage: "Let's review the designs", time: "2m ago" },
  { id: 2, title: "Team Standup", lastMessage: "Updates on the backend", time: "1h ago" },
  { id: 3, title: "Client Meeting", lastMessage: "Presentation feedback", time: "2h ago" },
]

interface ChatItemProps {
  title: string
  lastMessage: string
  time: string
  isActive?: boolean
  onClick?: () => void
}

function ChatItem({ title, lastMessage, time, isActive, onClick }: ChatItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg px-3 py-2 text-left transition-all duration-200",
        "hover:bg-white/10",
        "focus:outline-none focus:ring-2 focus:ring-white/20",
        isActive && "bg-white/10",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="mt-1 truncate text-sm text-gray-400">{lastMessage}</p>
    </button>
  )
}

export function ChatSidebar() {
  const [activeChat, setActiveChat] = React.useState<number | null>(null)
  const { open } = useSidebar()
  const {userDetail, setUserDetail} = React.useContext(UserInfoContext);

  React.useEffect(() => {
    userDetail&&getAllworkspaces();
  }, [userDetail])

  const getAllworkspaces = async () => {
    if (!userDetail?.id) return;
    const userId = userDetail.id;
    console.log("Requesting workspaces for userId:", userId);
    const response = await fetch(`/api/getAllWorkspaces/${userId}`);
    const data = await response.json();
    console.log("Received workspaces:", data);
    return data;
  }

  return (
    <Sidebar
      className={cn(
        "border-r-0 bg-black/50 text-white backdrop-blur-xl backdrop-saturate-150",
        "transition-all duration-300 ease-in-out",
        "border-r border-white/10",
      )}
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-white/10 p-2">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">ChatApp</span>
          </div>
        </div>
        <Button
          className={cn(
            "mt-4 w-full justify-start gap-2",
            "bg-white text-black transition-all duration-200",
            "hover:bg-white/90 hover:scale-[0.98]",
            "active:scale-[0.97]",
          )}
          size="lg"
        >
          <MessageCircle className="h-5 w-5" />
          Start New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-6">
        <h2 className="mb-4 text-xl font-semibold">Your Chats</h2>
        <div className="space-y-2">
          {sampleChats.map((chat) => (
            <ChatItem
              key={chat.id}
              title={chat.title}
              lastMessage={chat.lastMessage}
              time={chat.time}
              isActive={activeChat === chat.id}
              onClick={() => setActiveChat(chat.id)}
            />
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-white/10">
        <SidebarMenu>
          {[
            { icon: Settings, label: "Settings" },
            { icon: HelpCircle, label: "Help Center" },
            { icon: CreditCard, label: "My Subscription" },
            { icon: LogOut, label: "Sign Out" },
          ].map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-base",
                    "text-gray-300 hover:bg-white/10 hover:text-white",
                    "transition-all duration-200",
                    "focus:bg-white/10 focus:text-white focus:outline-none",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

