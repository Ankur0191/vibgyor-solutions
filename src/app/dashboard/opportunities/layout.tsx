"use client";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* TopBar */}
      <TopBar open={open} setOpen={setOpen} />
      
      {/* Ensures content starts below TopBar */}
      <Toolbar />
      
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} isMobile={false} />

        {/* Main Content - ✅ Fixed scrolling issue */}
        <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto", minHeight: "calc(100vh - 64px)" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}