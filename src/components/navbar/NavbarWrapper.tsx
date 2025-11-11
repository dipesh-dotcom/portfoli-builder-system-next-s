"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Navbar } from "./Navbar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function NavbarWrapper() {
  const { data: session } = useSession();
  const pathName = usePathname();

  const userRoutes = [
    "/dashboard",
    "/profile",
    "/education",
    "/experience",
    "/project",
    "/achievement",
    "/resume",
    "/skill",
    "/language",
  ];

  if (session && userRoutes.some((route) => pathName.startsWith(route))) {
    return null;
  }

  return <Navbar />;
}

export default NavbarWrapper;
