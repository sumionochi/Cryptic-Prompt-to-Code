import { Leaf, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation"; // Added
import { UserInfoContext } from "@/lib/UserInfoContext";
import Image from "next/image";
import { SignInDialog } from "./SignInDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CompileContext } from "@/lib/CompileContext";


export function Navbar() {
  const { userDetail, setUserDetail } = useContext(UserInfoContext);
  const { compile, setCompile } = useContext(CompileContext);
  const [openDialog, setOpenDialog] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter(); // Added

  const onCompile=(compile:string)=>{
    setCompile({
      type: compile,
      timeStamp: Date.now()
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('userDetail');
    setUserDetail(undefined); 
    document.cookie = 'userToken=; path=/; max-age=0';
    router.push('/');
  };

  return (
    <nav className="fixed z-10 top-0 left-0 right-0 border-b">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Leaf className="w-8 h-8" />
        </Link>
        <div className="flex flex-row gap-2">
          <Button variant={"ghost"} onClick={()=>onCompile('export')} className="glassmorphism">Export</Button>
          <Button variant={"ghost"} onClick={()=>onCompile('deploy')} className="glassmorphism">Deploy</Button>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {userDetail ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {userDetail.picture && (
                  <DropdownMenu>
                  <DropdownMenuTrigger className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <Image
                    src={userDetail.picture}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-2 p-4">
                    <DropdownMenuLabel className="text-lg font-bold">My Account</DropdownMenuLabel>
                    <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">{userDetail.name}</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-white hover:text-black transition-colors">{userDetail.email}</DropdownMenuItem>
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
              className="relative overflow-hidden rounded-lg border dark:border-white/10 dark:bg-white/5 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 flex items-center gap-2"
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
  );
}