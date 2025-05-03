import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollUp/ScrollToTop";
import { Toaster } from 'sonner';
import LoginContext from "@/provider/LoginContext";
import OrderCountProvider from "@/provider/CartContext";
import UserProvider, { UserContext } from "@/provider/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casemellow",
  description: "Your Design, Our Craft that last",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
        <OrderCountProvider>
        <LoginContext>
          <Toaster position="top-right"/>
          {children}
          <ScrollToTop/>
        </LoginContext>
        </OrderCountProvider>
        </UserProvider>
      </body>
    </html>
  );
}
