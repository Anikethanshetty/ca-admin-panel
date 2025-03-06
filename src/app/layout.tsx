import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./layoutConfig/LayoutWrapper";
import {metadata} from "./layoutConfig/metadata"
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Choose weights you need
})


export { metadata}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <LayoutWrapper >{children}</LayoutWrapper>
        <Toaster />
      </body>
    </html>
  );
}
