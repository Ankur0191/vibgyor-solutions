import Link from "next/link";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, IconButton } from "@mui/material";
import { Dashboard as DashboardIcon, BarChart as AnalyticsIcon, Work as OpportunitiesIcon, School as CertificateIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{ width: 240, flexShrink: 0, "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" } }}
    >
      <Toolbar>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton component={Link} href="/dashboard/profile">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/progress-analytics">
          <ListItemIcon><AnalyticsIcon /></ListItemIcon>
          <ListItemText primary="Progress & Analytics" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/opportunities">
          <ListItemIcon><OpportunitiesIcon /></ListItemIcon>
          <ListItemText primary="Opportunities" />
        </ListItemButton>
        <ListItemButton component={Link} href="/dashboard/certificates">
          <ListItemIcon><CertificateIcon /></ListItemIcon>
          <ListItemText primary="Certificates" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
