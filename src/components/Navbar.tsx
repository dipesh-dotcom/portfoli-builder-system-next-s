import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 my-10 gap-4 h-16 bg-gray-700 rounded-2xl text-white">
      <div className="logo font-bold text-xl">Clerk-Nextjs</div>
      <ul className="flex gap-6 ">
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="flex justify-between items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
