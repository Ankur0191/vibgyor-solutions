"use client";

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust based on navbar height
        behavior: "smooth",
      });
    }
    setMobileOpen(false);
  };

  const menuItems = ["About", "Services", "Events", "Sponsors", "Contact"];

  return (
    <AppBar position="fixed" className="bg-opacity-80 backdrop-blur-lg bg-gray-900 shadow-md">
      <Toolbar className="flex justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/VY0pPpRN/logo02.png"
            alt="Vibgyor Solutions Logo"
            className="h-10"
          />
          <span className="text-xl font-bold text-white hover:text-blue-500 transition-all">
            Vibgyor Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item.toLowerCase())}
              className="text-gray-300 hover:text-blue-500 transition-all relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Authentication & Dashboard Button */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="contained" color="secondary">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <IconButton onClick={toggleDrawer} className="md:hidden">
          <Menu className="text-white" />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <div className="w-72 h-full bg-gray-900 text-gray-300 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <IconButton onClick={toggleDrawer}>
              <Close className="text-white" />
            </IconButton>
          </div>
          <Divider className="bg-gray-700" />
          
          {/* Menu Items */}
          <List className="flex-1 p-4 space-y-4">
            {menuItems.map((item) => (
              <ListItem
                key={item}
                onClick={() => handleScroll(item.toLowerCase())}
                component="button" // Fix: Removed `button` prop error
                className="text-gray-300 hover:text-blue-500 text-lg"
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>

          <Divider className="bg-gray-700" />
          
          {/* Authentication */}
          <div className="p-4 flex flex-col gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-center py-2 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700"
              >
                Login
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-center">
                <Button variant="contained" color="secondary" fullWidth>
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
