import ProfileCard from "./Card";
import pfp from "@/public/dp.png";
import Image from "next/image";
export default function ContentSideBar() {
  return (
    <div className="h-full w-2xl flex flex-col bg-card justify-start gap-4 border border-border items-center rounded-xl p-2 pt-4 overflow-y-scroll shadow-sm">
      <ContentHeader />
      <ProfileCard />
    </div>
  );
}

export function ContentHeader() {
  return (
    <div>
      <p className="font-bold text-xl ">Campus Connection</p>
    </div>
  );
}

export function DisplayTag({
  className,
  children,
}: {
  className?: String;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p
        className={`bg-neutral-100 dark:bg-neutral-800 w-fit px-2 py-1 rounded-full text-sm ${className}`}
      >
        {children}
      </p>
    </div>
  );
}
