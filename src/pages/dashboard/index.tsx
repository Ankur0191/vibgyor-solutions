"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Profile from "./profile/page";
import { Certificate } from "crypto";


export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/sign-in");
    else if (isLoaded && user) {
      fetch(`/api/student?clerkId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setStudent(data))
        .catch(console.error);
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!student) return <Typography sx={{ p: 3 }}>Loading student data...</Typography>;

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: open ? 240 : 0 }}>
        <Toolbar />
        <Profile student={student} setStudent={setStudent} />
      </Box>
    </Box>
  );
}
