"use client";
import pfp from "@/public/dp.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileCard() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://server-campus-connections.onrender.com/user/dashboard",
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        setUserData({ error: "Failed to fetch data" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-fit flex flex-col gap-2 p-2 rounded-xl">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full  h-fit  flex flex-col gap-2  p-2 rounded-xl ">
      {userData &&
        userData.map((user: any, index: number) => (
          <div
            key={index}
            className="flex flex-col border rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 gap-2"
          >
            <div className="flex gap-4 justify-start items-center">
              <div className="size-10 rounded-full overflow-hidden">
                <Image src={user.image || pfp} alt={user.name} />
              </div>
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="font text-xs text-muted-foreground">
                  {user.role} @ {user.company}
                </p>
              </div>
            </div>

            {/* Bio  */}
            <div className="flex gap-2">
              <DisplayTag>{user.city}</DisplayTag>
              <DisplayTag>{user.batch}</DisplayTag>
              <DisplayTag>{user.college}</DisplayTag>
            </div>
          </div>
        ))}
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
