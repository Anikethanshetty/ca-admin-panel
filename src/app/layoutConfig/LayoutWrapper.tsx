"use client";

import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login" || "/register" || "/forgotpassword") {
    return <>{children}</>; // Skip layout for login page
  }

  return (
          <main className="p-4">{children}</main>
  );
}
