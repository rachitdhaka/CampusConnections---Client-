"use client";
import pfp from "@/public/dp.png";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function ProfileCard() {
  const [userData, setUserData] = useState<any>(null);
  const fetchingData = async () => {
    try {
      const response = await axios.get("http://localhost:1000/user/dashboard");
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      setUserData({ error: "Failed to fetch data" });
    }
  };

  return (
    <div className="w-full  h-fit  flex flex-col gap-2 border p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800">
      {/* temp button to fetch data */}
      {/* <button onClick={fetchingData} className="bg-blue-500 text-white px-2 py-1 rounded-full">Fetch Data</button> */}

      <div className="flex gap-4 justify-start  items-center">
        <div className="size-10 rounded-full overflow-hidden">
          <Image src={pfp} alt="John Doe" />
        </div>
        <div>
          <p className="font-semibold text-sm">John Doe</p>
          <p className="font text-xs text-muted-foreground">Google</p>
        </div>
      </div>

      {/* Bio  */}
      <div className="flex gap-2">
        <DisplayTag>Gurugram, Haryana</DisplayTag>
        <DisplayTag>2026</DisplayTag>
        <DisplayTag>Computer Science</DisplayTag>
      </div>
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

{
  /* Profile Picture  */
}
// {userData && userData.map((user: any, index: number) => (
//   <div key={index} className="flex flex-col border rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 gap-2">
//     <div className="flex gap-4 justify-start items-center">
//       <div className="size-10 rounded-full overflow-hidden">
//         <Image src={user.image || pfp} alt={user.name} />
//       </div>
//       <div>
//         <p className="font-semibold text-sm">{user.name}</p>
//         <p className="font text-xs text-muted-foreground">{user.company}</p>
//       </div>
//     </div>

{
  /* Bio  */
}
{
  /* <div className="flex gap-2">
            <DisplayTag>{user.workingLocation}</DisplayTag>
            <DisplayTag>{user.batch}</DisplayTag>
            <DisplayTag>{user.course}</DisplayTag>
          </div>

          
        </div>
      ))} */
}
