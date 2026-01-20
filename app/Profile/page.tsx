"use client";

import * as React from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  User,
  Briefcase,
  MapPin,
  Phone,
  GraduationCap,
  Building2,
  Loader2,
  Pencil,
  Mail,
  Calendar,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface UserProfile {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  area?: string;
  city?: string;
  contact?: string;
  college?: string;
  batch?: string;
}

export default function ProfilePage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProfile() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const email = user.primaryEmailAddress.emailAddress;
        const response = await axios.get(
          `https://server-campus-connections.onrender.com/user/profile?email=${encodeURIComponent(email)}`,
        );

        if (response.data?.user) {
          setProfile(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    }

    if (isUserLoaded && user) {
      fetchProfile();
    } else if (isUserLoaded && !user) {
      setIsLoading(false);
    }
  }, [isUserLoaded, user]);

  // Loading state
  if (!isUserLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>
              Please sign in to view your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile info item component
  const ProfileItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string;
  }) => (
    <div className="flex items-start gap-3 py-3">
      <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value || "—"}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle */}
      <div className="flex justify-end items-center backdrop-blur-sm w-fit ml-auto p-2 rounded-full border border-neutral-200 dark:border-neutral-700">
        <AnimatedThemeToggler />
      </div>

      {/* Profile Header */}
      <div className="max-w-2xl mx-auto mt-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-2 border-primary/10 shadow-lg">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-primary/60" />
            )}
          </div>

          {/* Name and Email */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {profile?.name || user.fullName || "Your Profile"}
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="h-4 w-4" />
              {profile?.email || user.primaryEmailAddress?.emailAddress}
            </p>

            {/* Edit Button */}
            <Button asChild className="mt-4" variant="outline">
              <Link href="/UpdateProfile" className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="py-4">
              <p className="text-destructive text-center">{error}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Profile Card */}
      <Card className="max-w-2xl mx-auto shadow-xl border-border/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your professional details and contact information.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Work Information Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <Briefcase className="h-4 w-4" />
              Work Information
            </div>
            <div className="h-px bg-border/50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <ProfileItem
                icon={Building2}
                label="Company"
                value={profile?.company}
              />
              <ProfileItem
                icon={Briefcase}
                label="Role"
                value={profile?.role}
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <MapPin className="h-4 w-4" />
              Location
            </div>
            <div className="h-px bg-border/50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <ProfileItem icon={MapPin} label="Area" value={profile?.area} />
              <ProfileItem icon={MapPin} label="City" value={profile?.city} />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <Phone className="h-4 w-4" />
              Contact Details
            </div>
            <div className="h-px bg-border/50" />
            <ProfileItem
              icon={Phone}
              label="Phone Number"
              value={profile?.contact}
            />
          </div>

          {/* Education Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <GraduationCap className="h-4 w-4" />
              Education
            </div>
            <div className="h-px bg-border/50" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <ProfileItem
                icon={GraduationCap}
                label="College / University"
                value={profile?.college}
              />
              <ProfileItem
                icon={Calendar}
                label="Graduation Year"
                value={profile?.batch}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Text */}
      <p className="text-center text-sm text-muted-foreground mt-6 max-w-md mx-auto">
        Keep your profile updated to help others connect with you on the
        network.
      </p>
    </div>
  );
}
