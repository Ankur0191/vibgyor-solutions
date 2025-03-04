import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children} {/* ✅ Now public pages (like landing page) are accessible */}
        </body>
      </html>
    </ClerkProvider>
  );
}
