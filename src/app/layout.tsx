import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./layoutConfig/LayoutWrapper";
import {metadata} from "./layoutConfig/metadata"
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";

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
       <StoreProvider>
       <LayoutWrapper >{children}</LayoutWrapper>
       <Toaster />
        </StoreProvider> 
      </body>
    </html>
  );
}
