"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Navbar } from "./Navbar";

function NavbarWrapper() {
  const { isSignedIn } = useUser();
  if (isSignedIn) return null;

  return <Navbar />;
}

export default NavbarWrapper;
