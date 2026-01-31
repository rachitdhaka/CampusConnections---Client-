"use client";

import { useState } from "react";
import pfp from "@/public/user.png";
import Image from "next/image";
import PersonProfileModal from "@/components/Main/PersonProfileModal";

interface UserData {
  _id?: string;
  name: string;
  company: string;
  role: string;
  city: string;
  area?: string;
  batch: string;
  college: string;
  image?: string;
}

interface ProfileCardMobileProps {
  userData: UserData[] | null;
  isLoading: boolean;
}

export default function ProfileCardMobile({
  userData,
  isLoading,
}: ProfileCardMobileProps) {
  const [selectedPerson, setSelectedPerson] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (user: UserData) => {
    setSelectedPerson(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected person for exit animation
    setTimeout(() => setSelectedPerson(null), 200);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex items-center gap-3 p-4 rounded-xl bg-muted/50"
          >
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!userData || userData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          className="w-16 h-16 text-muted-foreground/50 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-muted-foreground">No alumni found</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {userData.map((user, index) => (
          <div
            key={user._id || index}
            onClick={() => handleCardClick(user)}
            className="flex flex-col gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 active:scale-[0.98] transition-all cursor-pointer"
          >
            {/* User Info Row */}
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={user.image || pfp}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {user.role} @ {user.company}
                </p>
              </div>
            </div>

            {/* Tags Row */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted">
                📍 {user.city}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted">
                🎓 {user.batch}
              </span>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted truncate max-w-[150px]">
                🏫 {user.college}
              </span>
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
