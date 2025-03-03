"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Typography } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Profile from "./profile/page";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [student, setStudent] = useState<{ email: string; university?: string; course?: string } | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    } else if (isLoaded && user) {
      fetch(`/api/student?clerkId=${user.id}&name=${user.username || user.fullName}&email=${user.primaryEmailAddress}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setStudent(data);
          }
        })
        .catch(console.error);
    }
  }, [isLoaded, isSignedIn, user, router]);

  const updateProfile = async (university: string, course: string) => {
    if (!student) return;
    const response = await fetch("/api/student", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: user?.id,
        university,
        course,
      }),
    });
    const updatedStudent = await response.json();
    setStudent(updatedStudent);
  };

  if (!student) return <Typography sx={{ p: 3 }}>Loading student data...</Typography>;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Passing setOpen instead of toggleSidebar */}
      <TopBar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: open ? `240px` : 0, transition: "0.3s" }}>
        <Toolbar />
        <Profile student={student} updateProfile={updateProfile} />
      </Box>
    </Box>
  );
}
