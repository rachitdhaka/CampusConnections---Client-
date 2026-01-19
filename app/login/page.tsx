
import { Globe } from "@/components/ui/globe";
import { SignIn } from "@clerk/nextjs";


export default function LoginPage() {
  return (
    <div className="  flex flex-col justify-center  h-screen items-center" >
      <div className="">
        <Globe  />
      </div>
      <div className="">
        <SignIn/>
      </div>
    </div>
  );
}
