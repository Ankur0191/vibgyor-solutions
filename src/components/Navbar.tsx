"use client";

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Smooth Scroll Function
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const menuItems = ["About", "Services", "Events", "Sponsors", "Contact"];

  return (
    <AppBar position="fixed" className="bg-gray-900 shadow-lg">
      <Toolbar className="flex justify-between px-6 py-3">
        {/* Logo with Text */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/VY0pPpRN/logo02.png" // Update with the correct path to your logo image in the public folder
            alt="Vibgyor Solutions Logo"
            className="h-10" // Adjust the size as needed
          />
          <span className="text-xl font-bold text-white hover:text-blue-500 transition-colors">
            Vibgyor Solutions
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item.toLowerCase())}
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
            >
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <IconButton onClick={toggleDrawer} className="md:hidden">
          <Menu className="text-white" />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
          <List className="w-60 p-4 bg-gray-800 text-gray-300">
            {/* Close Button */}
            <div className="flex justify-end">
              <IconButton onClick={toggleDrawer}>
                <Close className="text-white" />
              </IconButton>
            </div>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <ListItem
                component="button"
                key={item}
                onClick={() => handleScroll(item.toLowerCase())}
                className="text-left text-gray-300 hover:text-blue-500"
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}

            {/* Authentication for Mobile */}
            <SignedOut>
              <ListItem>
                <Link href="/sign-in" className="text-blue-600 w-full text-center py-2 hover:text-blue-700">
                  Login
                </Link>
              </ListItem>
            </SignedOut>
            <SignedIn>
              <ListItem>
                <UserButton afterSignOutUrl="/" />
              </ListItem>
            </SignedIn>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
