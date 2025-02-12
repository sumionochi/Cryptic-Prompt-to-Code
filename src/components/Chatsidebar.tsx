"use client"

import * as React from "react"
import { CreditCard, HelpCircle, Leaf, LogOut, MessageCircle, Settings, Zap } from "lucide-react"

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
import { Badge } from "./ui/badge"

import { Loader } from "lucide-react"

import { useRouter } from "next/navigation"

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
        "dark:hover:bg-white/10 hover:bg-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-white/20",
        isActive && "dark:bg-white/10 bg-gray-100",
      )}
    >
      <div className="flex flex-col gap-2 items-start justify-start">
        <Badge className="text-xs">{time}</Badge>
        <span className="font-medium text-sm dark:text-white text-gray-900">{title}</span>
      </div>
      <p className="truncate text-sm text-gray-500 dark:text-gray-400">{lastMessage}</p>
    </button>
  )
}

export function ChatSidebar() {
  const router = useRouter()
  const [activeChat, setActiveChat] = React.useState<number | null>(null)
  const [workspaces, setWorkspaces] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { open } = useSidebar()
  const {userDetail, setUserDetail} = React.useContext(UserInfoContext);

  React.useEffect(() => {
    userDetail && getAllworkspaces();
  }, [userDetail])

  const getAllworkspaces = async () => {
    if (!userDetail?.id) return;
    try {
      setIsLoading(true);
      const userId = userDetail.id;
      const response = await fetch(`/api/getAllWorkspaces/${userId}`);
      const data = await response.json();
      setWorkspaces(data.workspaces);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sidebar
      className={cn(
        "border-r-0 bg-black/50 z-20 text-white backdrop-blur-xl backdrop-saturate-150",
        "transition-all duration-300 ease-in-out",
        "border-r border-white/10",
      )}
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <div className="rounded-lg p-2">
              <Leaf className="text-black dark:text-white h-5 w-5" />
            </div>
            <span className="text-lg text-black dark:text-white font-semibold">{userDetail?.name.split(" ")[0]}'s Space</span>
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
          onClick={() => router.push('/')}
        >
          <MessageCircle className="h-5 w-5" />
          Start New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-6 scrollbar-hide">
        <div className="space-y-2 scrollbar-hide">
          {isLoading ? (
            <div className="flex flex-row gap-1 items-center justify-center py-10">
              <Loader className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
              <h2 className="text-black text-sm font-semibold dark:text-white">Syncing...</h2>
            </div>
          ) : (
            workspaces.map((workspace: any) => (
              <ChatItem
                key={workspace.id}
                title={workspace.message[0].content}
                lastMessage={workspace.message[1].content || 'No description'}
                time={new Date(workspace.createdAt).toLocaleDateString()}
                isActive={activeChat === workspace.id}
                onClick={() => {
                  setActiveChat(workspace.id)
                  router.push(`/workspace/${workspace.id}`)
                }}
              />
            ))

          )}
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
                    "w-full justify-start gap-3 text-sm",
                    "text-black dark:text-white",
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

