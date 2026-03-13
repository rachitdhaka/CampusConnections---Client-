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

// to remove the popup on map click
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
  users: { name: string; batch: string }[];
}

export default function ClusterMap() {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: PlaceProperties;
  } | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setIsError(false);
    setSlowLoad(false);
    const slowTimer = setTimeout(() => setSlowLoad(true), 5000);
    try {
      const response = await axios.get(
        "https://server-campus-connections.onrender.com/user/dashboard",
        { timeout: 65000 },
      );
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsError(true);
    } finally {
      clearTimeout(slowTimer);
      setIsLoading(false);
      setSlowLoad(false);
    }
  };

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group users by exact coordinates and convert to GeoJSON
  const placesGeoJSON = useMemo(() => {
    // Group users by exact lat/lon coordinates to handle people at the same location
    const grouped = usersData.reduce<
      Record<
        string,
        {
          users: { name: string; batch: string }[];
          lat: number;
          lon: number;
          location: string;
        }
      >
    >((acc, user) => {
      // Use coordinates as the key to group users at the exact same location
      const key = `${user.lat},${user.lon}`;
      if (!acc[key]) {
        acc[key] = {
          users: [],
          lat: user.lat,
          lon: user.lon,
          location: `${user.area}, ${user.city}`,
        };
      }
      acc[key].users.push({ name: user.name, batch: user.batch });
      return acc;
    }, {});

    // Convert to GeoJSON FeatureCollection
    return {
      type: "FeatureCollection" as const,
      features: Object.entries(grouped).map(([coordKey, data]) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [data.lon, data.lat] as [number, number],
        },
        properties: {
          id: coordKey,
          location: data.location,
          users: data.users,
          userCount: data.users.length,
        },
      })),
    };
  }, [usersData]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden">
      {(isLoading || isError) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 gap-3">
          {isLoading ? (
            <>
              <div className="w-8 h-8 border-4 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
              {slowLoad && (
                <p className="text-xs text-muted-foreground">
                  Server is starting up, please wait…
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center px-4">
                Could not load map data. Server may be starting up.
              </p>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}
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
            <div className="min-w-[220px] space-y-3 p-3">
              <p className="text-base font-semibold border-b pb-2">
                📍 {selectedPoint.properties.location}
              </p>
              <div className="space-y-2 text-sm">
                {(() => {
                  const users =
                    typeof selectedPoint.properties.users === "string"
                      ? JSON.parse(selectedPoint.properties.users)
                      : selectedPoint.properties.users;
                  return users.map(
                    (user: { name: string; batch: string }, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-muted-foreground">👤</span>
                        <span>
                          <span className="font-medium">{user.name}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            • Batch {user.batch}
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
  );
}
