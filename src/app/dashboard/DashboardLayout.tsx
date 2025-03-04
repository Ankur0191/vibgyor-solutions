"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Typography, useMediaQuery, useTheme, Drawer } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Profile from "./profile/page";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false); // Default closed on mobile
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    } else if (isLoaded && user) {
      fetch(`/api/students?clerkId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setStudent(data))
        .catch(console.error);
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!student) return <Typography sx={{ p: 3, textAlign: "center", mt: 5 }}>Loading student data...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Navigation Bar */}
      <TopBar setOpen={setOpen} open={false} />

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Mobile Sidebar - Uses Drawer */}
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Sidebar open={open} setOpen={setOpen} isMobile />
        </Drawer>

        {/* Desktop Sidebar - Always Visible */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar open={open} setOpen={setOpen} isMobile={false} />
        </Box>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 3,
            overflowY: "auto", // ✅ Fix scrolling issue
            minHeight: "100vh",
            transition: "margin 0.3s",
          }}
        >
          <Toolbar /> {/* Ensures content starts below TopBar */}
          <Profile student={student} setStudent={setStudent} />
        </Box>
      </Box>
    </Box>
  );
}