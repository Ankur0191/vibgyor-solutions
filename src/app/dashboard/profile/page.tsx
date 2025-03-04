"use client";
import { useState, useEffect, SetStateAction } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import Sidebar from "../Sidebar";

interface ProfileProps {
  student?: any; // Made optional to prevent errors
  setStudent?: React.Dispatch<React.SetStateAction<any>>; // Optional for safety
}

export default function Profile({ student, setStudent }: ProfileProps) {
  const { user } = useUser();
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch student data when the component mounts
  useEffect(() => {
    if (user?.id) {
      fetch(`/api/students?clerkId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (setStudent) setStudent(data); // Only call if setStudent exists
          setUniversity(data.university || "");
          setCourse(data.course || "");
          setIsEditing(!data.university || !data.course);
        })
        .catch((error) => console.error("❌ Error fetching student:", error));
    }
  }, [user, setStudent]); // Added setStudent as a dependency for consistency

  const handleUpdate = async () => {
    setLoading(true);
    const response = await fetch("/api/students", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkId: user?.id, university, course }),
    });
    const updatedStudent = await response.json();
    if (setStudent) setStudent(updatedStudent); // Ensure no error if undefined
    setIsEditing(false);
    setLoading(false);
  };

  // ✅ Handle loading state
  if (!student) {
    return <Typography variant="body1">Loading student profile...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={false} setOpen={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } isMobile={false} />

      {/* Main content */}
      <Box sx={{ flex: 1, p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4">
          Welcome, {user?.username || user?.fullName}!
        </Typography>
        <Typography variant="body1">Email: {student.email}</Typography>

        {isEditing ? (
          <>
            <TextField
              label="University"
              fullWidth
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Course"
              fullWidth
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1">
              <strong>University:</strong> {student.university || "Not Set"}
            </Typography>
            <Typography variant="body1">
              <strong>Course:</strong> {student.course || "Not Set"}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}