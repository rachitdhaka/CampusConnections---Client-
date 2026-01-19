import bg from "@/public/bg.webp";
import bgLight from "@/public/bgLight.webp";
import { Button } from "./ui/Button";
import Image from "next/image";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Container } from "./Container";

export const ImageSection = () => {
  return (
    <div className="relative">
      

      <Container>
        <div className="mask-b-from-55% relative mt-4 py-4 md:mt-8 overflow-hidden px-2 w-full ">
          <div className="inset-shadow-2xs ring-background bg-background relative mx-auto max-w-5xl overflow-hidden rounded-xl md:rounded-2xl border-dashed border-neutral-400 p-2 md:p-4 shadow-lg shadow-zinc-950/15 ring-1">
            <Image
              className="bg-background aspect-15/8 relative hidden rounded-4xl md:rounded-2xl dark:block w-full h-auto"
              src={bg}
              alt="app screen"
              width="2700"
              height="1440"
            />
            <Image
              className="bg-background aspect-15/8 relative block rounded-4xl md:rounded-2xl dark:hidden w-full h-auto"
              src={bgLight}
              alt="app screen"
              width="2700"
              height="1440"
            />
          </div>
        </div>
      </Container>

     
    </div>
  );
};
