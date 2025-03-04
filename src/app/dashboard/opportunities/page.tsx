"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useUser } from "@clerk/nextjs"; // Import Clerk's user hook
import TopBar from "../TopBar";
import Sidebar from "../Sidebar";

export default function Opportunities() {
  const { user } = useUser(); // Get logged-in user details
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{ id: number; title: string; description: string } | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<{ id: number; title: string; description: string }[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/register?user=${user.primaryEmailAddress?.emailAddress}`)
        .then((res) => res.json())
        .then((data) => setRegisteredEvents(data));
    }
  }, [user]);

  const opportunities = [
    { id: 1, title: "Startup Incubation", description: "Join a leading startup accelerator program." },
    { id: 2, title: "AI Hackathon 2025", description: "Compete in an AI-focused hackathon and win exciting prizes." },
    { id: 3, title: "GreenTech Challenge", description: "Solve real-world sustainability problems with technology." }
  ];

  const handleRegister = async () => {
    if (!selectedEvent || !user) return;
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: selectedEvent, user: user.primaryEmailAddress?.emailAddress })
    });
    if (res.ok) {
      setRegisteredEvents([...registeredEvents, selectedEvent]);
      setModalOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <TopBar setOpen={setOpen} open={open} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar open={open} setOpen={setOpen} isMobile={false} />
        <Box sx={{ p: 3, flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Opportunities</Typography>
          <Typography sx={{ mb: 3 }}>Explore upcoming events and career opportunities.</Typography>

          {/* Opportunities List */}
          <Box sx={{ display: "grid", gap: 2 }}>
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{opportunity.title}</Typography>
                  <Typography sx={{ mb: 1 }}>{opportunity.description}</Typography>
                  <Button variant="contained" color="primary" onClick={() => { setSelectedEvent(opportunity); setModalOpen(true); }}>Register</Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Registered Events */}
          {registeredEvents.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Your Registered Events</Typography>
              <List>
                {registeredEvents.map((event, index) => (
                  <ListItem key={index}>{event.title}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Box>

      {/* Registration Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <Typography>{selectedEvent?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
