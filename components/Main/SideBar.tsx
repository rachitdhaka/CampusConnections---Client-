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

export default function Sidebar() {
  return (
    <div className="absolute z-10 top-4 left-60 w-xl border hidden md:flex bg-transparent backdrop-blur-2xl justify-between gap-4 items-center rounded-xl p-2">
      <div className="flex justify-center items-center gap-2">
        <SignedIn>
          <UserButton showName />
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

      <div className="flex justify-center items-center">
        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
