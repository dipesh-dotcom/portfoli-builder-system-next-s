"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleAuthButton from "../buttons/google-auth-button";
import GithubAuthButton from "../buttons/github-auth-button";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res: any = await signIn("credentials", {
      redirect: false,
      email,
      password,
    } as any);

    setIsLoading(false);

    if (res?.error) {
      let message = String(res.error);
      if (message === "Configuration") {
        message = "Email not verified. Please check your inbox.";
      } else if (message === "CredentialsSignin" || /invalid/i.test(message)) {
        message = "Invalid email or password";
      } else if (/both fields/i.test(message)) {
        message = "Both email and password are required";
      }
      toast.error(message);
    } else {
      toast.success(res.message ?? "Logged in successfully");
      router.push("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Social login buttons */}
        <div className="space-y-3 mb-6">
          <GoogleAuthButton />
          <GithubAuthButton />
        </div>

        {/* Divider */}
        <div className="relative mb-6 flex items-center">
          <div className="flex-grow border-t border-border" />
          <span className="px-4 text-sm text-muted-foreground">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-semibold">
              Email address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-card text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-foreground font-semibold"
              >
                Password <span className="text-destructive">*</span>
              </Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-card text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign in
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Sign up link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:text-primary/80 font-medium transition-colors underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
