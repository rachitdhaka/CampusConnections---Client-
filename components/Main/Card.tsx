"use client";
import pfp from "@/public/user.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import PersonProfileModal from "./PersonProfileModal";

interface Person {
  name: string;
  role: string;
  company: string;
  city: string;
  batch: string;
  college: string;
  image?: string;
  email?: string;
  contact?: string;
}

export default function ProfileCard() {
  const [userData, setUserData] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (user: Person) => {
    setSelectedPerson(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected person for exit animation
    setTimeout(() => setSelectedPerson(null), 200);
  };

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
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-fit flex flex-col gap-3 p-2 rounded-xl">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex items-center gap-3 p-4 rounded-xl bg-muted/50"
          >
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-fit flex flex-col gap-2 p-2 rounded-xl">
        {userData &&
          userData.map((user: Person, index: number) => (
            <div
              key={index}
              onClick={() => handleCardClick(user)}
              className="flex flex-col border border-border rounded-xl bg-card hover:bg-muted/50 p-3 gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex gap-4 justify-start items-center">
                <div className="size-10 rounded-full overflow-hidden bg-muted">
                  <Image src={user.image || pfp} alt={user.name} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.role} @ {user.company}
                  </p>
                </div>
              </div>

              {/* Bio  */}
              <div className="flex flex-wrap gap-2">
                <DisplayTag>📍 {user.city}</DisplayTag>
                <DisplayTag>🎓 {user.batch}</DisplayTag>
                <DisplayTag>🏫 {user.college}</DisplayTag>
              </div>
            </div>
          ))}
      </div>

      {/* Person Profile Modal */}
      <PersonProfileModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
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
    <span
      className={`bg-muted w-fit px-3 py-1.5 rounded-full text-xs font-medium ${className || ""}`}
    >
      {children}
    </span>
  );
}
