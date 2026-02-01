"use client";

import { useState } from "react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  Map,
  LogIn,
  UserPlus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navlinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Map,
  },
  {
    name: "Profile",
    href: "/Profile",
    icon: User,
  },
  {
    name: "Update Profile",
    href: "/UpdateProfile",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`
        relative h-full
        flex flex-col
        bg-card/80 backdrop-blur-xl
        border-r border-border/50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-[72px]" : "w-[72px] lg:w-[240px]"}
      `}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="
          hidden lg:flex
          absolute -right-3 top-7
          w-6 h-6
          items-center justify-center
          bg-card border border-border
          rounded-full
          text-muted-foreground
          hover:text-foreground hover:bg-muted
          transition-all duration-200
          shadow-sm
          z-10
        "
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Brand Logo */}
      <div
        className="
        flex items-center gap-3
        px-4 py-5
        border-b border-border/30
      "
      >
        <div
          className="
          flex items-center justify-center
          w-10 h-10
          bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100
          dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30
          rounded-xl
          shadow-sm
          transition-transform duration-500 hover:rotate-12
          shrink-0
        "
        >
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <span
          className={`
          font-serif-italic text-lg
          text-foreground
          tracking-tight
          transition-all duration-300
          overflow-hidden whitespace-nowrap
          ${isCollapsed ? "w-0 opacity-0" : "hidden lg:block w-auto opacity-100"}
        `}
        >
          Campus
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navlinks.map((navlink) => {
          const isActive = pathname === navlink.href;
          return (
            <Link
              key={navlink.name}
              href={navlink.href}
              className={`
                group relative flex items-center gap-3
                px-3 py-2.5
                rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <span
                  className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  w-1 h-6
                  bg-primary
                  rounded-r-full
                "
                />
              )}

              <navlink.icon
                className={`
                w-5 h-5 shrink-0
                transition-transform duration-200
                group-hover:scale-110
                ${isActive ? "text-primary" : ""}
              `}
              />

              <span
                className={`
                text-sm font-medium
                transition-all duration-300
                overflow-hidden whitespace-nowrap
                ${isCollapsed ? "w-0 opacity-0" : "hidden lg:block w-auto opacity-100"}
              `}
              >
                {navlink.name}
              </span>

              {/* Tooltip for collapsed state */}
              <span
                className={`
                absolute left-full ml-3
                px-2 py-1
                bg-popover text-popover-foreground text-xs font-medium
                border border-border
                rounded-md shadow-lg
                opacity-0 group-hover:opacity-100
                pointer-events-none
                transition-opacity duration-200
                whitespace-nowrap
                z-50
                ${isCollapsed ? "lg:block" : "lg:hidden"}
              `}
              >
                {navlink.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - Theme Toggle & User */}
      <div
        className="
        flex flex-col gap-2
        p-3
        border-t border-border/30
      "
      >
        {/* Theme Toggle */}
        <div
          className="
          flex items-center justify-center gap-3
          px-3 py-2
          rounded-xl
          text-muted-foreground
          hover:text-foreground hover:bg-muted/50
          transition-all duration-200
          cursor-pointer
          group
        "
        >
          <AnimatedThemeToggler
            className="
            w-5 h-5 shrink-0
            transition-transform duration-200
            group-hover:scale-110
          "
          />
          <span
            className={`
            text-sm font-medium
            transition-all duration-300
            overflow-hidden whitespace-nowrap
            ${isCollapsed ? "w-0 opacity-0" : "hidden lg:block w-auto opacity-100"}
          `}
          >
            Theme
          </span>
        </div>

        {/* User Section */}
        <SignedIn>
          <div
            className={`
            flex items-center gap-3
            p-2
            bg-muted/30
            rounded-xl
            border border-border/30
            ${isCollapsed ? "justify-center" : "justify-center lg:justify-start"}
          `}
          >
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonOuterIdentifier: isCollapsed
                    ? "hidden"
                    : "hidden lg:block text-sm font-medium text-foreground truncate",
                  userButtonBox: "gap-2",
                },
              }}
              showName={!isCollapsed}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col gap-2">
            <SignInButton mode="modal">
              <button
                className="
                flex items-center justify-center gap-3
                px-3 py-2
                text-sm font-medium
                text-muted-foreground
                hover:text-foreground hover:bg-muted/50
                rounded-xl
                transition-all duration-200
                group
              "
              >
                <LogIn className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span
                  className={`
                  transition-all duration-300
                  overflow-hidden whitespace-nowrap
                  ${isCollapsed ? "w-0 opacity-0" : "hidden lg:block w-auto opacity-100"}
                `}
                >
                  Sign In
                </span>
              </button>
            </SignInButton>

            <SignUpButton
              mode="modal"
              forceRedirectUrl="/CompleteInformation"
              fallbackRedirectUrl="/CompleteInformation"
            >
              <button
                className="
                flex items-center justify-center gap-3
                px-3 py-2
                text-sm font-medium
                bg-primary text-primary-foreground
                rounded-xl
                transition-all duration-200
                hover:opacity-90
                group
              "
              >
                <UserPlus className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span
                  className={`
                  transition-all duration-300
                  overflow-hidden whitespace-nowrap
                  ${isCollapsed ? "w-0 opacity-0" : "hidden lg:block w-auto opacity-100"}
                `}
                >
                  Sign Up
                </span>
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </aside>
  );
}
