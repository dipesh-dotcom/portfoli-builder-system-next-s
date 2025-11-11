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

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully!", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
    { name: "Education", icon: GraduationCap, href: "/education" },
    { name: "Experience", icon: Briefcase, href: "/experience" },
    { name: "Project", icon: FolderKanban, href: "/project" },
    { name: "Achievement", icon: Award, href: "/achievement" },
    { name: "Resume", icon: FileText, href: "/resume" },
    { name: "Skill", icon: Wrench, href: "/skill" },
    { name: "Language", icon: Languages, href: "/language" },
  ];

  const titleMap: Record<string, string> = Object.fromEntries(
    navItems.map((item) => [item.href, item.name])
  );

  return (
    <div className="flex h-screen bg-background grid-background overflow-hidden">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: isMobileMenuOpen ? 0 : 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className={`
            ${
              isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
            fixed lg:static inset-y-0 left-0 z-50
            w-64 border-r border-sidebar-border bg-sidebar flex flex-col 
            transition-transform duration-300 ease-in-out
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="p-6 border-b border-sidebar-border relative z-10 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20 backdrop-blur-sm flex-1"
            >
              <span className="text-lg font-semibold text-sidebar-foreground">
                Logo
              </span>
            </motion.div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 relative z-10">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start relative overflow-hidden group ${
                          activeNav === item.name
                            ? "text-sidebar-primary-foreground bg-primary/10 border border-primary/30"
                            : "text-muted-foreground hover:text-sidebar-foreground"
                        }`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <item.icon className="mr-3 h-5 w-5 relative z-10" />
                        <span className="relative z-10">{item.name}</span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-16 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6 flex items-center justify-between relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
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

          <div className="flex items-center gap-1 md:gap-2 relative z-10">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-warning" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href={"/"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all relative"
                >
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all"
              >
                <User />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="rounded-full hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all"
              >
                <LogOut />
                Logout
              </Button>
            </motion.div>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
