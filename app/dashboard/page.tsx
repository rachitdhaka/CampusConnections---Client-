import ClusterMap from "@/components/Main/ClusterMap";
import ContentSideBar from "@/components/Main/ContentSideBar";
import Sidebar from "@/components/Main/SideBar";
import DashboardMobileView from "@/components/Mobile/DashboardMobileView";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";
import { AnimatedThemeToggler } from "../../components/ui/animated-theme-toggler";

export default function Page() {
  return (
    <>
      {/* Show sign-in/sign-up UI when user is not logged in */}
      <SignedOut>
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-background relative overflow-y-auto py-8 px-4">
          {/* Theme toggler fixed to top-right */}
          <div className="fixed top-4 right-4 z-50">
            <AnimatedThemeToggler />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 p-5 md:p-10 rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm w-full max-w-3xl">
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3 md:mb-4">
                <span className="font-serif italic text-chart-5">
                  Campus Connect
                </span>
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-4 md:mb-6 leading-relaxed">
                Discover alumni near you and build meaningful connections
              </p>

              <div className="h-px bg-border" />

              <div className="flex justify-center md:justify-start gap-3 my-4 md:my-5">
                <SignInButton mode="modal">
                  <Button className="cursor-pointer inline-flex w-fit items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:scale-100 transition-transform duration-300">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton
                  mode="modal"
                  forceRedirectUrl="/CompleteInformation"
                  fallbackRedirectUrl="/CompleteInformation"
                >
                  <Button className="cursor-pointer inline-flex w-fit items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:scale-100 transition-transform duration-300">
                    Create Account
                  </Button>
                </SignUpButton>
              </div>

              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Join thousands of students and alumni worldwide
              </p>
            </div>

            {/* Globe */}
            <div className="relative flex items-center justify-center w-full max-w-[240px] sm:max-w-xs md:max-w-sm overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 p-6 pb-24 md:p-8 md:pb-40">
              <span className="font-serif pointer-events-none bg-gradient-to-b tracking-tight from-black to-gray-300/80 bg-clip-text text-center text-3xl md:text-6xl whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 z-10">
                Connect
              </span>
              <Globe className="top-20 md:top-28" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
            </div>
          </div>
        </div>
      </SignedOut>

      {/* Show dashboard when user is logged in */}
      <SignedIn>
        {/* Desktop View - visible at md (768px) and above */}
        <div className="hidden md:flex h-screen bg-background">
          {/* Left Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex gap-2 p-2">
            <ClusterMap />
            <ContentSideBar />
          </div>
        </div>

        {/* Mobile View - visible below md (768px) */}
        <div className="block md:hidden">
          <DashboardMobileView />
        </div>
      </SignedIn>
    </>
  );
}
