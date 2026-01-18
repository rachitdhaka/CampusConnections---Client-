"use client";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <SignUp afterSignUpUrl="/CompleteInformation" />
    </div>
  );
}
