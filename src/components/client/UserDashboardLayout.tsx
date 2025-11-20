"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  LayoutDashboard,
  UserCircle,
  GraduationCap,
  Menu,
  X,
  Briefcase,
  FolderKanban,
  Award,
  FileText,
  Wrench,
  Languages,
  Home,
  User,
  LogOut,
  Github,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import GlobalLoading from "@/app/loading";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  // Initialize theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully!", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
    { name: "Education", icon: GraduationCap, href: "/education" },
    { name: "Experience", icon: Briefcase, href: "/experience" },
    { name: "Project", icon: FolderKanban, href: "/project" },
    { name: "Achievement", icon: Award, href: "/achievement" },
    { name: "Skill", icon: Wrench, href: "/skill" },
    { name: "Language", icon: Languages, href: "/language" },
    { name: "Resume", icon: FileText, href: "/resume" },
    { name: "Github Data", icon: Github, href: "/github" },
  ];

  const titleMap: Record<string, string> = Object.fromEntries(
    navItems.map((item) => [item.href, item.name])
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: isMobileMenuOpen ? 0 : 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center justify-center h-12 bg-primary/10 rounded-lg flex-1">
              <span className="text-lg font-semibold text-foreground">
                Logo
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                        ${
                          activeNav === item.name
                            ? "bg-primary/10 text-primary border border-primary/30 shadow-sm"
                            : "text-foreground hover:bg-primary/10 hover:text-primary hover:translate-x-1 hover:shadow-sm"
                        }`}
                    >
                      <item.icon className="h-5 w-5 transition-colors duration-200" />
                      {item.name}
                    </Button>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              {titleMap[pathName] || "Dashboard"}
            </h1>
          </div>

          {/* Header actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full border border-transparent hover:bg-primary/10 hover:scale-110 hover:shadow-md transition-all duration-200"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-warning" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>

            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-transparent hover:bg-primary/10 hover:scale-110 hover:shadow-md transition-all duration-200"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full border border-transparent hover:bg-primary/10 hover:scale-110 hover:shadow-md transition-all duration-200 flex items-center gap-1"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
