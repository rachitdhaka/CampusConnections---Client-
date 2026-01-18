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
          <SignInButton mode="modal" oauthFlow="popup">
            <Button size="sm" variant="link" className="cursor-pointer">
              Login
            </Button>
          </SignInButton>
          <SignUpButton mode="modal" oauthFlow="popup">
            <Button variant="link" size="sm" className="mr-4 cursor-pointer">
              Signup
            </Button>
          </SignUpButton>
        </SignedOut>
      </div>

      <div className="flex justify-center items-center">
        <AnimatedThemeToggler />
      </div>
    </div>
  );
}
