import bg from "@/public/bg.webp";
import bgLight from "@/public/bgLight.webp";
import { Button } from "./ui/Button";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 md:gap-10 px-4 md:px-0">
      <div>
        <span className="bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter font-bold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 block">
          You Are Not Alone
        </span>
        <p className="text-center text-sm md:text-lg text-neutral-600 dark:text-neutral-300 font-semibold mt-4 max-w-xl mx-auto">
          Turn the city from a cold void into a familiar network. Locate your
          alumni nearby.
        </p>
      </div>

      <Button className="text-sm dark:bg-neutral-900 hover:scale-105 duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:hover:shadow-[0px_0px_120px_0px_#90cdf4] min-h-[44px] px-6">
        <a href="/dashboard">Join the Cluster</a>
      </Button>

      <div className="mask-b-from-55% relative mt-4 md:mt-8 overflow-hidden px-2 w-full">
        <div className="inset-shadow-2xs ring-background bg-background relative mx-auto max-w-5xl overflow-hidden rounded-xl md:rounded-2xl border border-neutral-400 p-2 md:p-4 shadow-lg shadow-zinc-950/15 ring-1">
          <Image
            className="bg-background aspect-15/8 relative hidden rounded-xl md:rounded-2xl dark:block w-full h-auto"
            src={bg}
            alt="app screen"
            width="2700"
            height="1440"
          />
          <Image
            className="bg-background aspect-15/8 relative block rounded-xl md:rounded-2xl dark:hidden w-full h-auto"
            src={bgLight}
            alt="app screen"
            width="2700"
            height="1440"
          />
        </div>
      </div>
    </div>
  );
};
