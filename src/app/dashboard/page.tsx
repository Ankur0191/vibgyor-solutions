"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Typography, useMediaQuery, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Profile from "./profile/page";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

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

  if (!student) {
    return (
      <Typography sx={{ p: 3, textAlign: "center", mt: 5 }}>
        Loading student data...
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Navigation */}
      <TopBar setOpen={setOpen} open={open} />

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Mobile Sidebar - Uses Drawer */}
        {isMobile ? (
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <Sidebar open={open} setOpen={setOpen} isMobile />
          </Drawer>
        ) : (
          /* Desktop Sidebar - Always Visible */
          <Sidebar open={open} setOpen={setOpen} isMobile={false} />
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 3,
            overflowY: "auto",
            minHeight: "100vh",
            transition: "margin 0.3s ease",
          }}
        >
          <Toolbar />
          <Profile student={student} setStudent={setStudent} />
        </Box>
      </Box>
    </Box>
  );
}
