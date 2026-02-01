"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  X,
  MapPin,
  GraduationCap,
  Building2,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";
import pfp from "@/public/user.png";

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
  linkedin?: string;
}

interface PersonProfileModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonProfileModal({
  person,
  isOpen,
  onClose,
}: PersonProfileModalProps) {
  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!person) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(12px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-background/60"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header with gradient accent */}
            <div className="relative h-24 bg-gradient-to-br from-muted via-muted/80 to-accent/30">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="size-24 overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg">
                  <Image
                    src={person.image || pfp}
                    alt={person.name}
                    width={96}
                    height={96}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 pt-16">
              {/* Name & Role */}
              <div className="text-center">
                <h2 className="font-serif text-2xl tracking-tight text-foreground">
                  {person.name}
                </h2>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase size={14} className="shrink-0" />
                  <span>
                    {person.role} @ {person.company}
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Info Grid */}
              <div className="space-y-4">
                <InfoRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={person.city}
                />
                <InfoRow
                  icon={<GraduationCap size={16} />}
                  label="Batch"
                  value={person.batch}
                />
                <InfoRow
                  icon={<Building2 size={16} />}
                  label="College"
                  value={person.college}
                />
                {person.email && (
                  <InfoRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={person.email}
                    href={`mailto:${person.email}`}
                  />
                )}
                {person.contact && (
                  <InfoRow
                    icon={<Phone size={16} />}
                    label="Contact"
                    value={person.contact}
                    href={`tel:${person.contact}`}
                  />
                )}
              </div>

              {/* Tags Section */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Tag>📍 {person.city}</Tag>
                <Tag>🎓 {person.batch}</Tag>
                <Tag>🏫 {person.college}</Tag>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-lg p-1 -m-1 transition-colors hover:bg-muted/50"
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80">
      {children}
    </span>
  );
}
