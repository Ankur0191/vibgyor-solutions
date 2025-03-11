"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/images/Vibgyor_logo.png"
              alt="Vibgyor Solutions Logo"
              width={200}
              height={200}
              priority
            />
            {/* <span className="text-xl font-bold text-white hover:text-blue-500 transition-all">
              Vibgyor Solutions
            </span> */}
          </div>
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
            <Link href="/sign-in" passHref>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" passHref>
              <Button variant="contained" color="secondary">
                Dashboard
              </Button>
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
              <ListItem key={item} component="li" onClick={() => handleScroll(item.toLowerCase())}>
                <ListItemText primary={item} className="text-gray-300 hover:text-blue-500 text-lg" />
              </ListItem>
            ))}
          </List>

          <Divider className="bg-gray-700" />

          {/* Authentication */}
          <div className="p-4 flex flex-col gap-4">
            <SignedOut>
              <Link href="/sign-in" passHref>
                <Button variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" passHref>
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
