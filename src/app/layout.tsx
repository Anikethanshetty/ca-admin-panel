import {  Poppins } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./layoutConfig/LayoutWrapper";
import {metadata} from "./layoutConfig/metadata"
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";


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
      <head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
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
