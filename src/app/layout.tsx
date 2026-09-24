import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fit Log",
  description: "Workout Library and Workout Planning Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        <Navbar />

        {children}
         <hr></hr>
        <h2> Footer </h2>
      </body>
    </html>
  );
}