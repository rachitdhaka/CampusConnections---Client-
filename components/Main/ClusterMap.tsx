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
import Sidebar from "./SideBar";

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
  users: { name: string; company: string }[];
}

export default function ClusterMap() {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
          "http://localhost:1000/user/dashboard",
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
    // Group users by area
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

    // Convert to GeoJSON FeatureCollection
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
    <div className="h-full w-full rounded-xl overflow-hidden">
      <Sidebar />
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
                  // Parse users if it's a string (MapClusterLayer serializes arrays)
                  const users =
                    typeof selectedPoint.properties.users === "string"
                      ? JSON.parse(selectedPoint.properties.users)
                      : selectedPoint.properties.users;
                  return users.map(
                    (
                      user: { name: string; company: string },
                      index: number,
                    ) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-muted-foreground">👤</span>
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
  );
}
