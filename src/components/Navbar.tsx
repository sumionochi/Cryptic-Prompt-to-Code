import { Leaf, LogOut } from "lucide-react"
import Link from "next/link"
import { useContext } from "react"
import { UserInfoContext } from "@/lib/UserInfoContext"
import Image from "next/image"

export function Navbar() {
  const { userDetail, setUserDetail } = useContext(UserInfoContext);

  const handleSignOut = () => {
    setUserDetail(undefined);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50 border-b-2 border-white">
      <div className="mx-auto flex justify-between items-center p-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Leaf className="w-8 h-8" />
        </Link>
        <div className="flex gap-4 items-center">
          {userDetail ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {userDetail.picture && (
                  <Image
                    src={userDetail.picture}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-white font-mono">{userDetail.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors font-mono"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <button className="px-4 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors font-mono">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
