"use client";

import { Navbar } from "@/components/navbarComponent/navbar";
import { usePathname } from "next/navigation";


export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (pathname === "/register") {
    return <>{children}</>;
  }

  if (pathname === "/forgotpassword") {
    return <>{children}</>;
  }
  if (pathname === "/forgotpassword/otp") {
    return <>{children}</>;
  }
  if (pathname === "/forgotpassword/newpassword") {
    return <>{children}</>;
  }
    return (
      <>
        <Navbar />
      <main>{children}</main>
      </>
    )
}
