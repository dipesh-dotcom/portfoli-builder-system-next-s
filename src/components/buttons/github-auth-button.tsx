import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const GithubAuthButton = () => {
  const pathname = usePathname();

  const handleGithubSignIn = async () => {
    try {
      // Redirect to homepage after login, unless already on a different page
      const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
      const callbackUrl = isAuthPage ? "/" : pathname;

      await signIn("github", {
        callbackUrl: callbackUrl || "/",
        redirect: true, // Keep redirect true for OAuth flow
      });
    } catch (error) {
      console.error("GitHub Sign-in failed:", error);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGithubSignIn}
      className="w-full bg-card border-border hover:bg-muted text-foreground"
    >
      <FaGithub className="w-5 h-5" />
      Continue with GitHub
    </Button>
  );
};

export default GithubAuthButton;
