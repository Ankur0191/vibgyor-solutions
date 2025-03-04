"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} isMobile={false} />
       {/* TopBar */}
       <TopBar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
       

        {/* Page Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
