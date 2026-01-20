import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import UserPlusIcon from "../ui/user-plus-icon";
import UserCheckIcon from "../ui/user-check-icon";
import { Button } from "../ui/button";

import Link from "next/link";

const navlinks = [
  {
    name: "Update profile",
    href: "/UpdateProfile",
  },
  {
    name: "Profile",
    href: "/Profile",
  },
];

export default function Sidebar() {
  return (
    <div className="absolute flex bg-transparent backdrop-blur-md border  justify-between items-center top-4 md:top-10 z-10 inset-x-0 mx-auto w-full max-w-2xl px-4 py-2 md:py-2 rounded-xl ">
      <div className="flex justify-between items-center gap-2">
        <SignedIn>
          <div className="flex justify-end items-center gap-2 backdrop-blur-sm   w-fit p-1 rounded-full px-2 border border-neutral-200 dark:border-neutral-700 ">
            <UserButton showName />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex justify-end items-center gap-2 backdrop-blur-sm   w-fit p-1 rounded-full px-2 border border-neutral-200 dark:border-neutral-700 ">
            <button className="p-1 px-2 border border-neutral-200/50 rounded-full hover:scale-105 duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800  dark:border-neutral-800">
              Sign In
            </button>
            <button className="p-1 px-2 border border-neutral-200/50 rounded-full hover:scale-105 duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800  dark:border-neutral-800">
              Sign Up
            </button>
          </div>
        </SignedOut>
      </div>

      <div className="flex justify-end items-center gap-2 backdrop-blur-sm   w-fit p-1 rounded-full px-2 border border-neutral-200 dark:border-neutral-700">
        {navlinks.map((navlink) => (
          <button
            key={navlink.name}
            className="p-1 px-2 border border-neutral-200/50 rounded-full hover:scale-105 duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800  dark:border-neutral-800"
          >
            <Link href={navlink.href}>{navlink.name}</Link>
          </button>
        ))}
      </div>

      <div className="flex justify-end items-center backdrop-blur-sm   w-fit p-2 rounded-full border border-neutral-200 dark:border-neutral-700 ">
        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
