import ProfileCard from "./Card";
import pfp from "@/public/dp.png";
import Image from "next/image";
export default function ContentSideBar() {
  return (
    <div className="h-full w-2xl  flex flex-col bg-neutral-100 dark:bg-neutral-900 justify-start gap-4 border items-center rounded-xl p-2 pt-4 overflow-y-scroll">
      <ContentHeader />
      <ProfileCard />

      {/* Block 1 */}
      <div className="w-full h-fit flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <div className="flex gap-4 justify-start items-center">
          <div className="size-10 rounded-full overflow-hidden">
            <Image src={pfp} alt="Aarav Sharma" />
          </div>
          <div>
            <p className="font-semibold text-sm">Aarav Sharma</p>
            <p className="text-xs text-muted-foreground">Microsoft</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DisplayTag>Bengaluru, Karnataka</DisplayTag>
          <DisplayTag>2025</DisplayTag>
          <DisplayTag>Computer Science</DisplayTag>
        </div>
      </div>

      {/* Block 2 */}
      <div className="w-full h-fit flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <div className="flex gap-4 justify-start items-center">
          <div className="size-10 rounded-full overflow-hidden">
            <Image src={pfp} alt="Neha Verma" />
          </div>
          <div>
            <p className="font-semibold text-sm">Neha Verma</p>
            <p className="text-xs text-muted-foreground">Amazon</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DisplayTag>Hyderabad, Telangana</DisplayTag>
          <DisplayTag>2026</DisplayTag>
          <DisplayTag>Information Technology</DisplayTag>
        </div>
      </div>

      {/* Block 3 */}
      <div className="w-full h-fit flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <div className="flex gap-4 justify-start items-center">
          <div className="size-10 rounded-full overflow-hidden">
            <Image src={pfp} alt="Rohit Meena" />
          </div>
          <div>
            <p className="font-semibold text-sm">Rohit Meena</p>
            <p className="text-xs text-muted-foreground">Flipkart</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DisplayTag>Jaipur, Rajasthan</DisplayTag>
          <DisplayTag>2024</DisplayTag>
          <DisplayTag>Software Engineering</DisplayTag>
        </div>
      </div>

      {/* Block 4 */}
      <div className="w-full h-fit flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <div className="flex gap-4 justify-start items-center">
          <div className="size-10 rounded-full overflow-hidden">
            <Image src={pfp} alt="Simran Kaur" />
          </div>
          <div>
            <p className="font-semibold text-sm">Simran Kaur</p>
            <p className="text-xs text-muted-foreground">Infosys</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DisplayTag>Chandigarh</DisplayTag>
          <DisplayTag>2027</DisplayTag>
          <DisplayTag>Computer Engineering</DisplayTag>
        </div>
      </div>

      {/* Block 5 */}
      <div className="w-full h-fit flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
        <div className="flex gap-4 justify-start items-center">
          <div className="size-10 rounded-full overflow-hidden">
            <Image src={pfp} alt="Kunal Singh" />
          </div>
          <div>
            <p className="font-semibold text-sm">Kunal Singh</p>
            <p className="text-xs text-muted-foreground">Zomato</p>
          </div>
        </div>
        <div className="flex gap-2">
          <DisplayTag>Delhi</DisplayTag>
          <DisplayTag>2026</DisplayTag>
          <DisplayTag>Data Science</DisplayTag>
        </div>
      </div>
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
