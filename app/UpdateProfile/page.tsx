"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  Loader2,
  Save,
  User,
  Briefcase,
  MapPin,
  Phone,
  GraduationCap,
  Building2,
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const formSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters."),
  role: z.string().min(2, "Role must be at least 2 characters."),
  area: z.string().min(2, "Area must be at least 2 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  contact: z.string().min(10, "Contact number must be at least 10 characters."),
  college: z.string().min(2, "College name must be at least 2 characters."),
  batch: z.string().min(1, "Batch is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      role: "",
      area: "",
      city: "",
      contact: "",
      college: "",
      batch: "",
    },
  });

  // Fetch existing user data
  React.useEffect(() => {
    async function fetchUserData() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const response = await axios.get(
          `https://server-campus-connections.onrender.com/user/profile/${user.primaryEmailAddress.emailAddress}`,
        );

        if (response.data) {
          const userData = response.data;
          form.reset({
            company: userData.company || "",
            role: userData.role || "",
            area: userData.area || "",
            city: userData.city || "",
            contact: userData.contact || "",
            college: userData.college || "",
            batch: userData.batch || "",
          });
        }
      } catch (error) {
        console.log("No existing profile found or error fetching:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded && user) {
      fetchUserData();
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user, form]);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const geoCodeResponse = await axios.get(
        `https://geocode.maps.co/search?q=${data.area}+${data.city}&api_key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`,
      );

      let lat = geoCodeResponse.data[0]?.lat;
      let lon = geoCodeResponse.data[0]?.lon;

      if (!lat || !lon) {
        toast.error(
          "Could not find location. Please check your area and city.",
        );
        setIsSubmitting(false);
        return;
      }

      const updateData = {
        email: user?.primaryEmailAddress?.emailAddress,
        company: data.company,
        role: data.role,
        area: data.area,
        city: data.city,
        lon: lon,
        lat: lat,
        contact: data.contact,
        batch: data.batch,
        college: data.college,
      };

      await axios.put(
        "https://server-campus-connections.onrender.com/user/update",
        updateData,
      );

      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>
              Please sign in to update your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex justify-end items-center backdrop-blur-sm   w-fit p-2 rounded-full border border-neutral-200 dark:border-neutral-700 ">
        <AnimatedThemeToggler />    
      </div>
      <div className="max-w-4xl mx-auto mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4 hover:bg-accent/50 -ml-2"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex items-center gap-4 mb-2">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary/60" />
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Update Your Profile
            </h1>
            <p className="text-muted-foreground">
              {user.fullName} • {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="max-w-4xl mx-auto shadow-xl border-border/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your professional details to help others connect with you.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form
            id="profile-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Work Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <Briefcase className="h-4 w-4" />
                Work Information
              </div>
              <div className="h-px bg-border/50" />
              <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Controller
                  name="company"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        Company
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., Google, Microsoft, Startup Inc."
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        Role
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., Software Engineer, Product Manager"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <div className="h-px bg-border/50" />
              <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Controller
                  name="area"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Area / Neighborhood</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., Koramangala, Connaught Place"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>City</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., Bangalore, New Delhi"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <Phone className="h-4 w-4" />
                Contact Details
              </div>
              <div className="h-px bg-border/50" />
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="max-w-md">
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g., +91 9876543210"
                      className="h-11"
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
                <GraduationCap className="h-4 w-4" />
                Education
              </div>
              <div className="h-px bg-border/50" />
              <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Controller
                  name="college"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>College / University</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., IIT Delhi, BITS Pilani"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="batch"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Graduation Year</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g., 2024"
                        className="h-11"
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="min-h-[44px] w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => form.reset()}
                className="min-h-[44px] w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Reset Changes
              </Button>
              <Button
                type="submit"
                form="profile-form"
                className="min-h-[44px] w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Helper Text */}
      <p className="text-center text-sm text-muted-foreground mt-6 max-w-md mx-auto">
        Your location will be used to show your position on the map, helping
        alumni from your network find and connect with you.
      </p>
    </div>
  );
}
