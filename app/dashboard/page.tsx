import ClusterMap from "@/components/Main/ClusterMap";
import ContentSideBar from "@/components/Main/ContentSideBar";
import DashboardMobileView from "@/components/Mobile/DashboardMobileView";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      {/* Desktop View - visible at md (768px) and above */}
      <div className="hidden md:flex gap-2 h-screen p-2 bg-neutral-200 dark:bg-neutral-900">
        <SignedIn>
          <ClusterMap />
          <ContentSideBar />
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col h-screen w-screen justify-center items-center gap-4 bg-background relative overflow-hidden">
            {/* Subtle animated background elements */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-muted/50 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-muted/40 rounded-full blur-3xl animate-pulse" />

            {/* Main card */}
            <div className="relative z-10 flex flex-col gap-6 bg-card backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-border max-w-md w-full mx-4 transition-all duration-300 hover:shadow-2xl">
              {/* Icon/Logo */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <svg
                    className="w-8 h-8 text-primary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold text-foreground">
                  Campus Connect
                </h1>
                <p className="text-muted-foreground text-base">
                  Discover alumni near you and build meaningful connections
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <SignInButton mode="modal">
                  <Button className="w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.02]">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="outline"
                    className="w-full py-6 text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                  >
                    Create Account
                  </Button>
                </SignUpButton>
              </div>

              {/* Footer text */}
              <p className="text-center text-sm text-muted-foreground">
                Join thousands of students and alumni worldwide
              </p>
            </div>
          </div>
        </SignedOut>
      </div>

      {/* Mobile View - visible below md (768px) */}
      <div className="block md:hidden">
        <DashboardMobileView />
      </div>
    </>
  );
}
