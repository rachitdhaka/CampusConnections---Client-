import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <SignIn />
    </div>
  );
}
