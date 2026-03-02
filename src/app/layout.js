import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Harsh Shrivas | Full Stack MERN Developer",
  description:
    "Portfolio of Harsh Shrivas, a Full Stack MERN Developer specializing in React, Node.js, Express, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
        <CustomCursor />
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}