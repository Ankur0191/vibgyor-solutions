"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Typography, Drawer } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Profile from "./profile/page";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(null);

  // Protect Dashboard: Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <Typography sx={{ p: 3, textAlign: "center", mt: 5 }}>Checking authentication...</Typography>;
  }

  if (!isSignedIn) return null; // Prevent rendering dashboard for non-signed-in users

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Navigation Bar */}
      <TopBar setOpen={setOpen} open={false} />

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Mobile Sidebar - Uses Drawer */}
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Sidebar open={open} setOpen={setOpen} isMobile />
        </Drawer>

        {/* Desktop Sidebar - Always Visible */}
        <Sidebar open={open} setOpen={setOpen} isMobile={false} />

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, width: "100%", p: 3, overflowY: "auto", minHeight: "100vh" }}>
          <Toolbar /> {/* Ensures content starts below TopBar */}
          {children} {/* ✅ This allows all dashboard pages to be properly nested */}
        </Box>
      </Box>
    </Box>
  );
}
