import ClusterMap from "@/components/Main/ClusterMap";
import Sidebar from "@/components/Main/SideBar";
import ContentSideBar from "@/components/Main/ContentSideBar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="flex  gap-2 h-screen p-2 bg-neutral-200 dark:bg-neutral-900">
      <SignedIn>
        <ClusterMap />
        <ContentSideBar />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal" oauthFlow="popup">login</SignInButton>
        <SignUpButton mode="modal" oauthFlow="popup">signup</SignUpButton>
      </SignedOut>
    </div>
  );
}
