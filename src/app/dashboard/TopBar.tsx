"use client";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";
import { SetStateAction } from "react";

type TopBarProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  // other props
};

export default function TopBar({ setOpen }: TopBarProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: "#1976D2" }}>
      <Toolbar>
        {/* Clicking this button toggles the sidebar */}
        <IconButton color="inherit" edge="start" onClick={() => setOpen(prev => !prev)} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>Student Dashboard</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}
