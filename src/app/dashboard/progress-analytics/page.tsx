"use client";
import { Box, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { SetStateAction, useState } from "react";

export default function ProgressAnalytics() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} isMobile={false} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* TopBar */}
        <TopBar open={open} setOpen={setOpen} />

        {/* Page Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h5">Progress & Analytics</Typography>
          <Typography>Coming soon...</Typography>
        </Box>
      </Box>
    </Box>
  );
}
