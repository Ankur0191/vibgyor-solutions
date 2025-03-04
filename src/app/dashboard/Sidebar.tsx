import Link from "next/link";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, IconButton, useMediaQuery } from "@mui/material";
import { Dashboard as DashboardIcon, BarChart as AnalyticsIcon, Work as OpportunitiesIcon, School as CertificateIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={() => setOpen(false)} // Close sidebar on mobile when clicking outside
      sx={{ 
        width: 240, 
        flexShrink: 0, 
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } 
      }}
    >
      <Toolbar>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton component={Link} href="/dashboard" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/progress-analytics" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><AnalyticsIcon /></ListItemIcon>
          <ListItemText primary="Progress & Analytics" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/opportunities" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><OpportunitiesIcon /></ListItemIcon>
          <ListItemText primary="Opportunities" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/certificates" onClick={() => isMobile && setOpen(false)}>
          <ListItemIcon><CertificateIcon /></ListItemIcon>
          <ListItemText primary="Certificates" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
