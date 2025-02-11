import { Leaf, LogIn, LogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useContext, useState } from "react"
import { UserInfoContext } from "@/lib/UserInfoContext"
import Image from "next/image"
import { SignInDialog } from "./SignInDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { userDetail, setUserDetail } = useContext(UserInfoContext);
  const [openDialog, setOpenDialog] = useState(false);
  const { setTheme, theme } = useTheme();

  const handleSignOut = () => {
    localStorage.removeItem('userDetail');
    setUserDetail(undefined);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/20">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Leaf className="w-8 h-8" />
        </Link>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-white/10 rounded-md"
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {userDetail ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {userDetail.picture && (
                  <DropdownMenu>
                  <DropdownMenuTrigger>
                  <Image
                    src={userDetail.picture}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-2 border-white bg-black p-4">
                    <DropdownMenuLabel className="text-lg font-bold">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white" />
                    <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">{userDetail.name}</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">{userDetail.email}</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white" />
                    <DropdownMenuItem className="hover:bg-white cursor-pointer hover:text-black transition-colors" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>                
                )}
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setOpenDialog(true)}
              className="px-4 gap-2 flex flex-row items-center py-2 border-2 border-white hover:bg-white hover:text-black transition-colors font-mono"
            >
              <LogIn className="w-5 h-5"/>
              Sign In
            </button>
          )}
        </div>
      </div>
      <SignInDialog 
        openDialog={openDialog} 
        closeDialog={(value: boolean) => setOpenDialog(value)} 
      />
    </nav>
  )
}
