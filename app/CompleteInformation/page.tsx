"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios, { AxiosHeaders } from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { log } from "console";

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

export default function CompleteInformationPage() {
  const router = useRouter();
  const { user } = useUser();

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

  async function onSubmit(data: FormValues) {
    const geoCodeResponse = await axios.get(
      `https://geocode.maps.co/search?q=${data.area}+${data.city}&api_key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`,
    );

    console.log(geoCodeResponse.data);

    let lat = geoCodeResponse.data[0].lat;
    let lon = geoCodeResponse.data[0].lon;
    try {
      const mainData = {
        name: user?.fullName,
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
      console.log(mainData);
      await axios.post(
        "https://server-campus-connections.onrender.com/user/userInformation",
        mainData,
      );
      toast.success("Profile updated successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile Information</CardTitle>
          <CardDescription>
            Help us improve by filling your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="profile-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="company"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Company</FieldLabel>
                    <Input {...field} placeholder="Company name" />
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
                    <FieldLabel>Role</FieldLabel>
                    <Input {...field} placeholder="Your role" />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="area"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Area</FieldLabel>
                    <Input {...field} placeholder="Area" />
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
                    <Input {...field} placeholder="City" />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Controller
              name="contact"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Contact</FieldLabel>
                  <Input {...field} placeholder="Contact number" />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="college"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>College</FieldLabel>
                    <Input {...field} placeholder="College name" />
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
                    <FieldLabel>Batch</FieldLabel>
                    <Input {...field} placeholder="Batch" />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col-reverse sm:flex-row justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="min-h-[44px] w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="profile-form"
            className="min-h-[44px] w-full sm:w-auto"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
