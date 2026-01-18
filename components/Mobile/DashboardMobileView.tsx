"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Map,
  MapClusterLayer,
  MapPopup,
  MapControls,
  useMap,
} from "@/components/ui/map";
import MobileNavbar from "./MobileNavbar";
import ProfileCardMobile from "./ProfileCardMobile";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// To remove the popup on map click
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;
    const handleClick = () => onMapClick();
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
}

// Type for API response
interface UserData {
  _id: string;
  name: string;
  company: string;
  role: string;
  city: string;
  area: string;
  lon: number;
  lat: number;
  contact: string;
  batch: string;
  college: string;
}

// Type for grouped location properties
interface PlaceProperties {
  id: string;
  location: string;
  users: { name: string; company: string }[];
}

export default function DashboardMobileView() {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: PlaceProperties;
  } | null>(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://server-campus-connections.onrender.com/user/dashboard",
        );
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Group users by area and convert to GeoJSON
  const placesGeoJSON = useMemo(() => {
    const grouped = usersData.reduce<
      Record<
        string,
        { users: { name: string; company: string }[]; lat: number; lon: number }
      >
    >((acc, user) => {
      const key = `${user.area}, ${user.city}`;
      if (!acc[key]) {
        acc[key] = { users: [], lat: user.lat, lon: user.lon };
      }
      acc[key].users.push({ name: user.name, company: user.company });
      return acc;
    }, {});

    return {
      type: "FeatureCollection" as const,
      features: Object.entries(grouped).map(([location, data]) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [data.lon, data.lat] as [number, number],
        },
        properties: {
          id: location,
          location,
          users: data.users,
        },
      })),
    };
  }, [usersData]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-200 dark:bg-neutral-900">
      <SignedIn>
        <MobileNavbar />

        {/* Full-screen Map - pb-20 ensures controls are visible above the floating button */}
        <div className="h-full w-full pt-14 pb-20">
          <Map center={[78.9629, 20.5937]} zoom={4} fadeDuration={0}>
            <MapClickHandler onMapClick={() => setSelectedPoint(null)} />

            {!isLoading && placesGeoJSON.features.length > 0 && (
              <MapClusterLayer<PlaceProperties>
                data={placesGeoJSON}
                clusterRadius={30}
                clusterMaxZoom={14}
                clusterColors={["#22c55e", "#eab308", "#ef4444"]}
                pointColor="#3b82f6"
                onPointClick={(feature, coordinates) => {
                  setSelectedPoint({
                    coordinates,
                    properties: feature.properties,
                  });
                }}
              />
            )}

            {selectedPoint && (
              <MapPopup
                key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
                longitude={selectedPoint.coordinates[0]}
                latitude={selectedPoint.coordinates[1]}
                closeOnClick={false}
                focusAfterOpen={false}
              >
                <div className="min-w-[200px] space-y-2 p-2">
                  <p className="text-sm font-semibold border-b pb-1">
                    📍 {selectedPoint.properties.location}
                  </p>
                  <div className="space-y-1 text-xs">
                    {(() => {
                      const users =
                        typeof selectedPoint.properties.users === "string"
                          ? JSON.parse(selectedPoint.properties.users)
                          : selectedPoint.properties.users;
                      return users.map(
                        (
                          user: { name: string; company: string },
                          index: number,
                        ) => (
                          <div key={index} className="flex items-center gap-1">
                            <span>👤</span>
                            <span>
                              <span className="font-medium">{user.name}</span>
                              <span className="text-muted-foreground">
                                {" "}
                                @ {user.company}
                              </span>
                            </span>
                          </div>
                        ),
                      );
                    })()}
                  </div>
                </div>
              </MapPopup>
            )}

            <MapControls />
          </Map>
        </div>

        {/* Bottom Sheet Toggle Button */}
        <button
          onClick={() => setIsSheetOpen(!isSheetOpen)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-6 py-3 min-h-[48px] bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isSheetOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="font-medium">
            {isSheetOpen ? "Hide" : "View"} Alumni ({usersData.length})
          </span>
        </button>

        {/* Bottom Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-30 bg-background rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out ${
            isSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "60vh" }}
        >
          {/* Sheet Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Sheet Header */}
          <div className="px-4 pb-3 border-b flex items-center justify-between">
            <h2 className="font-bold text-lg">Alumni Directory</h2>
            <button
              onClick={() => setIsSheetOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-muted"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sheet Content */}
          <div className="overflow-y-auto h-[calc(60vh-80px)] px-4 py-3">
            <ProfileCardMobile userData={usersData} isLoading={isLoading} />
          </div>
        </div>

        {/* Sheet Backdrop */}
        {isSheetOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30"
            onClick={() => setIsSheetOpen(false)}
          />
        )}
      </SignedIn>

      <SignedOut>
        {/* Mobile Sign-out View */}
        <div className="flex flex-col h-screen w-full justify-center items-center gap-4 bg-background px-6 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-10 left-10 w-48 h-48 bg-muted/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-muted/40 rounded-full blur-3xl animate-pulse" />

          {/* Main card */}
          <div className="relative z-10 flex flex-col gap-5 bg-card backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-border w-full max-w-sm">
            {/* Icon/Logo */}
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">
                Campus Connect
              </h1>
              <p className="text-muted-foreground text-sm">
                Discover alumni near you and build meaningful connections
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <SignInButton mode="modal">
                <Button className="w-full min-h-[48px] text-base font-medium">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/CompleteInformation"
              >
                <Button
                  variant="outline"
                  className="w-full min-h-[48px] text-base font-medium"
                >
                  Create Account
                </Button>
              </SignUpButton>
            </div>

            {/* Footer text */}
            <p className="text-center text-xs text-muted-foreground">
              Join thousands of students and alumni worldwide
            </p>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
