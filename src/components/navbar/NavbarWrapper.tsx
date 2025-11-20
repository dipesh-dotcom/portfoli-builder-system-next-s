"use client";
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
    "/github",
    "/admin",
  ];

  if (session && userRoutes.some((route) => pathName.startsWith(route))) {
    return null;
  }

  return <Navbar />;
}

export default NavbarWrapper;
