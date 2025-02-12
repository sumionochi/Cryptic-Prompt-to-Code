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
import { Button } from "./ui/button";

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
        // Set authentication cookie
        document.cookie = `userToken=${userData._id}; path=/; max-age=2592000`; // 30 days expiry
        setUserDetail(userData);
        closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="border-2 rounded-lg border-black dark:border-white bg-white dark:bg-black">
            <DialogTitle className="text-3xl font-bold">
                Sign in to Cryptic
            </DialogTitle>
            <DialogDescription className="text-lg">
                Create an account to start obfuscating your code securely.
            </DialogDescription>
            <Button onClick={() => googleLogin()}>
                Sign in with Google
            </Button>
        </DialogContent>
        </Dialog>
    )
}