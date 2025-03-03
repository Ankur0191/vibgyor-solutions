import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "Vibgyor Solutions",
  description: "Next.js Web App with Clerk Authentication",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
