import type React from "react";
import { GlobeComponent } from "./Globe";
import { Container } from "./Container";

export const FeatureSection = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row border p-4 md:p-8 justify-center items-center mt-10 md:mt-20 gap-6 md:gap-0">
        <div className="flex flex-col justify-center items-center">
          <Heading>Features & Encrutpions</Heading>
          <p className="text-center text-neutral-500 text-xs md:text-sm max-w-2xl mt-2 leading-relaxed px-4">
            live, dark-mode visualization of your alumni network. The Radar
            strips away the noise of standard maps, focusing only on the signal:
            where your people are.
          </p>{" "}
        </div>

        <GlobeComponent />
      </div>
    </Container>
  );
};

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`${className} text-2xl md:text-4xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] bg-clip-text text-transparent`}
    >
      {children}
    </p>
  );
};

export const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: String;
}) => {
  return (
    <div
      className={`${className} px-10 py-6 flex flex-col justify-center items-center hover:scale-103 hover:shadow-2xl shadow-sky-400/20 duration-200 transition-all `}
    >
      {children}
    </div>
  );
};
