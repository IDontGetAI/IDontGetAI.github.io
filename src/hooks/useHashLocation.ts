import { useState, useEffect } from "react";

// Helper to get the current location path (excluding query string)
const currentLocation = () => {
    const hash = window.location.hash.replace(/^#/, "") || "/";
    // Strip query params for routing purposes
    return hash.split("?")[0];
};

export const useHashLocation = () => {
    const [loc, setLoc] = useState(currentLocation());

    useEffect(() => {
        const handler = () => setLoc(currentLocation());
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    // ignore extra wouter options
    const navigate = (to: string) => {
        window.location.hash = to;
    };

    return [loc, navigate] as [string, typeof navigate];
};
