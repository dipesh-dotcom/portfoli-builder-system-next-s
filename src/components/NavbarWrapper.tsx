"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Navbar } from "./Navbar";
import { usePathname } from "next/navigation";

function NavbarWrapper() {
  const { user, isLoaded } = useUser();
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

  if (
    isLoaded &&
    user &&
    userRoutes.some((route) => pathName.startsWith(route))
  ) {
    return null;
  }

  return <Navbar />;
}

export default NavbarWrapper;
