
import { Button } from "./ui/Button";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Container } from "./Container";

export const Hero = () => {
  return (
    <div className="relative py-10 pt-50" >
      <Container className="flex flex-col justify-center items-center ">

        <div>
          <span className="bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter font-bold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 block font-serif ">
            Reconnect <span className="text-chart-5">Rediscover</span> Reunite
          </span>
          <p className="text-center text-sm md:text-lg text-neutral-600 dark:text-neutral-400  mt-4 max-w-3xl mx-auto">
            See where your college friends are now. Drop your pin on the map and
            discover alumni living near you — because the {"   "}
            <span className="dark:text-white text-black text-3xl font-serif ">
              Best connections
            </span>
            {"   "} don't end at graduation.
          </p>
        </div>

        <Button className="text-sm dark:bg-neutral-900 hover:scale-105 duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:hover:shadow-[0px_0px_120px_0px_#90cdf4] min-h-[44px] px-6 mt-10 ">
          <a href="/dashboard">Join the Cluster</a>
        </Button>
      </Container>

      

      

     
    </div>
  );
};
