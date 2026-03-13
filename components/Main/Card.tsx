"use client";
import pfp from "@/public/user.png";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PersonProfileModal from "./PersonProfileModal";
import { motion } from "motion/react";

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

export default function ProfileCardsList() {
  const [userData, setUserData] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<
    "batch" | "city" | "college" | "name" | null
  >(null);

  const handleCardClick = (user: Person) => {
    setSelectedPerson(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected person for exit animation
    setTimeout(() => setSelectedPerson(null), 200);
  };

  const handleSort = (filterType: "batch" | "city" | "college" | "name") => {
    setSortBy(filterType);
  };

  const sortedData = useMemo(() => {
    if (!userData) return [];
    if (!sortBy) return userData;

    return [...userData].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [userData, sortBy]);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setSlowLoad(false);
    const slowTimer = setTimeout(() => setSlowLoad(true), 5000);
    try {
      const response = await axios.get(
        "kfk",
        { timeout: 65000 },
      );
      setUserData(response.data);
    } catch {
      setIsError(true);
      setUserData(null);
    } finally {
      clearTimeout(slowTimer);
      setIsLoading(false);
      setSlowLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this is the skeleton which is a loading animation
  if (isLoading) {
    return (
      <div className="w-full h-fit flex flex-col gap-3 p-2 rounded-xl">
        {slowLoad && (
          <p className="text-xs text-center text-muted-foreground px-2 pb-1">
            Server is starting up, please wait…
          </p>
        )}
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

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Could not reach the server. It may be starting up.
        </p>
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-fit flex flex-col gap-2 p-2 rounded-xl">
        {/* filtering buttons of sorting  */}
        <div className="flex gap-2 justify-center mb-5">
          <button
            onClick={() => handleSort("batch")}
            className={`p-1 rounded border text-sm cursor-pointer transition-all ${
              sortBy === "batch"
                ? "bg-accent border-accent font-semibold dark:text-chart-5"
                : "bg-accent"
            }`}
          >
            Batch
          </button>
          <button
            onClick={() => handleSort("name")}
            className={`p-1 rounded border text-sm cursor-pointer transition-all ${
              sortBy === "name"
                ? "bg-accent border-accent font-semibold dark:text-chart-5"
                : "bg-accent"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => handleSort("city")}
            className={`p-1 rounded border text-sm cursor-pointer transition-all ${
              sortBy === "city"
                ? "bg-accent border-accent font-semibold dark:text-chart-5"
                : "bg-accent"
            }`}
          >
            Location
          </button>
          <button
            onClick={() => handleSort("college")}
            className={`p-1 rounded border text-sm cursor-pointer transition-all ${
              sortBy === "college"
                ? "bg-accent border-accent font-semibold dark:text-chart-5"
                : "bg-accent"
            }`}
          >
            College
          </button>
        </div>

        {sortedData.map((user: Person, index: number) => (
          <motion.div
            key={user.email ?? index}
            layout
            layoutId={user.email}
            transition={{
              layout: {
                type: "tween",
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            onClick={() => handleCardClick(user)}
            className="flex flex-col  border border-border rounded-xl bg-card hover:bg-muted/50 p-3 gap-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <motion.div className="flex gap-4 justify-start  items-center">
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
            </motion.div>

            {/* Bio  */}
            <div className="flex flex-wrap gap-2">
              <DisplayTag>📍 {user.city}</DisplayTag>
              <DisplayTag>🎓 {user.batch}</DisplayTag>
              <DisplayTag>🏫 {user.college}</DisplayTag>
            </div>
          </motion.div>
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
