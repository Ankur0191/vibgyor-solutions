"use client";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";

interface TopBarProps {
  setOpen: (open: boolean) => void;
}

export default function TopBar({ setOpen }: TopBarProps) {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: "#1976D2" }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>Student Dashboard</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <UserButton />
      </Toolbar>
    </AppBar>
  );
}
