import { useEffect, useState } from "react";

export function navigate(path) {
  window.location.hash = path;
}

export function getHashPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith("/") ? hash : `/${hash}`;
}

export function useHashRoute() {
  const [path, setPath] = useState(getHashPath);

  useEffect(() => {
    function onChange() {
      setPath(getHashPath());
    }
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return path;
}

export function isAdminRoute(path) {
  return path === "/admin" || path.startsWith("/admin/");
}
