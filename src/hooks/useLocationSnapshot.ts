import { useEffect, useState } from "react";
import { ensureLocationEvents, getLocationSnapshot, type LocationSnapshot } from "@/lib/location";

export function useLocationSnapshot(): LocationSnapshot {
  const [snapshot, setSnapshot] = useState<LocationSnapshot>(() => getLocationSnapshot());

  useEffect(() => {
    ensureLocationEvents();
    const handler = () => setSnapshot(getLocationSnapshot());
    window.addEventListener("locationchange", handler);
    return () => window.removeEventListener("locationchange", handler);
  }, []);

  return snapshot;
}

