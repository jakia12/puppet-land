import { Geist, Geist_Mono } from "next/font/google";
import ModalProvider from "./components/ModalProvider";

import Navbar from "./components/shared/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Puppet Land",
  description:
    "Explore Puppet Land — an on-chain world of AI-generated pixel beings with unique personalities, memories, and evolving stories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Navbar />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
