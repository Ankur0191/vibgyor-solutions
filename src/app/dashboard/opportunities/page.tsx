"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import TopBar from "../TopBar";
import Sidebar from "../Sidebar";

export default function Opportunities() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  interface Event {
    id: number;
    title: string;
    description: string;
  }

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetch(`/api/register?user=${user.primaryEmailAddress.emailAddress}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setRegisteredEvents(data);
        });
    }
  }, [user]);

  const opportunities = [
    { id: 1, title: "Path Finder 2.0", description: "A startup pitching event with investor funding and networking opportunities. Date: 11th and 12th April 2025.." },
    { id: 2, title: "AI Hackathon 2025", description: "Compete in an AI-focused hackathon and win exciting prizes." },
    { id: 3, title: "GreenTech Challenge", description: "Solve real-world sustainability problems with technology." },
    { id: 4, title: "Startup Incubation", description: "Join a leading startup accelerator program." }
  ];

  const handleRegister = async () => {
    if (!selectedEvent || !user?.primaryEmailAddress?.emailAddress) return;
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: selectedEvent, user: user?.primaryEmailAddress?.emailAddress ?? '' })
    });
    if (res.ok) {
      if (selectedEvent) {
        setRegisteredEvents([...registeredEvents, selectedEvent]);
      }
      setPaymentModalOpen(false);
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
          <Button variant="outlined" href="https://jmp.sh/s/ZTDyLeRwAZekeLcNluF7" download sx={{ mr: 2 }}>Download Brochure</Button>
          <Button variant="outlined" href="https://jmp.sh/s/8TrTocusL8eVZxqDocVR" download>Download Sponsorship Proposal</Button>

          <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
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
          <Button variant="contained" color="primary" onClick={handleRegister}>Proceed to Payment</Button>
        </DialogActions>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
        <DialogTitle>Payment Options</DialogTitle>
        <DialogContent>
          <Typography>Select a payment method:</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePaymentSuccess}>Pay via Razorpay</Button>
          <Typography sx={{ mt: 2 }}>Or scan the QR code below and send the screenshot to example@email.com</Typography>
          <img src="https://i.ibb.co/V0p1mMSh/Whats-App-Image-2025-03-04-at-6-41-25-PM.jpg" alt="QR Payment" width="200px" style={{ marginTop: '10px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
