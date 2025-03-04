"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* TopBar */}
      <TopBar open={open} setOpen={setOpen} />

      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} isMobile={false} />

        {/* Main Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
