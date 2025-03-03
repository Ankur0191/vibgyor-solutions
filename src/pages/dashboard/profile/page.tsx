"use client";
import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useUser } from "@clerk/nextjs";

export default function Profile({ student, setStudent }: any) {
  const { user } = useUser();
  const [university, setUniversity] = useState(student.university || "");
  const [course, setCourse] = useState(student.course || "");
  const [isEditing, setIsEditing] = useState(!student.university || !student.course);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const response = await fetch("/api/student", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkId: user?.id, university, course }),
    });
    const updatedStudent = await response.json();
    setStudent(updatedStudent);
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <Box sx={{ mt: 3, maxWidth: 400 }}>
      <Typography variant="h4">Welcome, {user?.username || user?.fullName}!</Typography>
      <Typography variant="body1">Email: {student.email}</Typography>

      {isEditing ? (
        <>
          <TextField label="University" fullWidth value={university} onChange={(e) => setUniversity(e.target.value)} sx={{ mb: 2 }} />
          <TextField label="Course" fullWidth value={course} onChange={(e) => setCourse(e.target.value)} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" onClick={handleUpdate} disabled={loading}>{loading ? "Updating..." : "Save Changes"}</Button>
        </>
      ) : (
        <>
          <Typography variant="body1"><strong>University:</strong> {student.university || "Not Set"}</Typography>
          <Typography variant="body1"><strong>Course:</strong> {student.course || "Not Set"}</Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </Box>
  );
}
