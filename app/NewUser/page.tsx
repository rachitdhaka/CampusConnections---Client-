"use client";
import { SignUp } from "@clerk/nextjs";
import { Globe } from "@/components/ui/globe";
export default function SignupPage() {
  
  return (
    <div className=" relative flex justify-center  h-screen items-center" >
          <div className="">
            <Globe  />
          </div>
          <div className="relative top-20">
            <SignUp/>
          </div>
        </div>
  );
}
