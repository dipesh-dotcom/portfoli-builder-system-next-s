import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const GithubAuthButton = () => {
  const pathname = usePathname();

  const handleGoogleSignIn = async () => {
    try {
      // Redirect to homepage after login, unless already on a different page
      const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
      const callbackUrl = isAuthPage ? "/" : pathname;

      await signIn("google", {
        callbackUrl: callbackUrl || "/",
        redirect: true, // Keep redirect true for OAuth flow
      });
    } catch (error) {
      console.error("Google Sign-in failed:", error);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="w-full bg-card border-border hover:bg-muted text-foreground"
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </Button>
  );
};

export default GithubAuthButton;
