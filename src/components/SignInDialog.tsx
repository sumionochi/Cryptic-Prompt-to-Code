import { useContext } from "react";
import { UserInfoContext } from "@/lib/UserInfoContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SignInDialogProps {
  openDialog: boolean;
  closeDialog: (value: boolean) => void;
}

export function SignInDialog({ openDialog, closeDialog }: SignInDialogProps) {
  const { setUserDetail } = useContext(UserInfoContext);

  const handleGoogleSignIn = () => {
    // Simulating Google sign in
    setUserDetail({
      name: "User",
      email: "user@example.com",
    });
    closeDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="border-4 border-black dark:border-white bg-white dark:bg-black">
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-3xl font-bold">
            Sign in to Cryptic
          </DialogTitle>
          <DialogDescription className="text-lg">
            Join our community to start obfuscating your code securely.
          </DialogDescription>
          <button
            onClick={handleGoogleSignIn}
            className="w-full p-4 text-lg font-bold bg-white dark:bg-black border-4 border-black dark:border-white
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
  );
}