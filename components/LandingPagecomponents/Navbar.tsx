"use client";

import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";


export default function Navbar(){
  return(
    <div className="fixed flex justify-between items-center top-10 z-10 inset-x-0 mx-auto w-2xl px-4 py-4 rounded-xl ">
      <div className="flex justify-end items-center gap-2 backdrop-blur-sm   w-fit p-1 rounded-full px-2 border border-neutral-200 dark:border-neutral-700 ">
        <button className="p-1 px-2 border border-neutral-200/50 rounded-full hover:scale-105 duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800  dark:border-neutral-800"><a href="/login">Sign In</a></button>
        <button className="p-1 px-2 border border-neutral-200/50 rounded-full hover:scale-105 duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800  dark:border-neutral-800"><a href="/NewUser">Sign Up</a></button>
      </div>
      <div className="flex justify-end items-center backdrop-blur-sm   w-fit p-2 rounded-full border border-neutral-200 dark:border-neutral-700 ">
        <AnimatedThemeToggler />
      </div>
    </div>
  )
}