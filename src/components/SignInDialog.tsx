import { useContext } from "react";
import { UserInfoContext } from "@/lib/UserInfoContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface SignInDialogProps {
  openDialog: boolean;
  closeDialog: (value: boolean) => void;
}

export function SignInDialog({ openDialog, closeDialog }: SignInDialogProps) {
    const {userDetail, setUserDetail}=useContext(UserInfoContext);  
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
        );

        console.log("Here is the account data",userInfo.data);
        // Save user data to database
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo.data),
          });
      
        const userData = await res.json();
        localStorage.setItem('userDetail', JSON.stringify(userData));
        setUserDetail(userData);
        closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="border-2 rounded-none border-black dark:border-white bg-white dark:bg-black">
            <DialogHeader className="space-y-4">
                <DialogTitle className="text-3xl font-bold">
                    Sign in to Cryptic
                </DialogTitle>
                <DialogDescription className="text-lg">
                    Create an account to start obfuscating your code securely.
                </DialogDescription>
                <button
                    onClick={() => googleLogin()}
                    className="w-full p-4 text-lg font-bold bg-white dark:bg-black border-2 border-black dark:border-white
                    hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-[0px] active:translate-y-[0px]
                    shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255)]
                    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255)]
                    transition-all duration-200"
                >
                    Sign in with Google
                </button>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}