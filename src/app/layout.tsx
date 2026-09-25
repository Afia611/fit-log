import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import WorkoutProvider from "@/context/WorkoutContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/shared/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

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
      <body className={`${oswald.variable} bg-[#0B0D0E] text-white`}>
        <WorkoutProvider>
          <Navbar />
          {children}

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="dark"
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}