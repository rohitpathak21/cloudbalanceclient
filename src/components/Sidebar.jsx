import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import CloudIcon from "@mui/icons-material/Cloud";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Role-based permissions configuration
const rolePermissions = {
  ADMIN: ["*", "/usermanagement", "/onboarding","/costexplorer", "/awsservices"],
  READONLY: ["/usermanagement", "/costexplorer", "/awsservices"],
  CUSTOMER: ["/awsservices", "/costexplorer"],
};

const Sidebar = ({ open }) => {
  const drawerWidth = open ? 240 : 70; // Adjust width based on open state

  // Get the current user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {}; // Defaults to empty object if no user found

  // Define navigation items (with paths and icons)
  const navItems = [
    { text: "User Management", icon: <PeopleIcon />, path: "/usermanagement" },
    { text: "Onboarding", icon: <PeopleIcon />, path: "/onboarding" },
    { text: "Cost Explorer", icon: <MonetizationOnIcon />, path: "/costexplorer" },
    { text: "AWS Services", icon: <CloudIcon />, path: "/awsservices" },
  ];

  // Get allowed routes based on the user's role
  const userRole = user?.role;
  const allowedRoutes = rolePermissions[userRole] || [];

  // Filter navItems based on the allowed routes for the current user role
  const filteredNavItems = navItems.filter((item) =>
    allowedRoutes.includes("*") || allowedRoutes.some((route) => item.path.startsWith(route))
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          top: '86px', // Adjust to match Navbar height
          transition: 'width 0.3s',
        },
      }}
    >
      <Box sx={{ pt: 2, px: 2 }}>
        <List>
          {filteredNavItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#1976d2" : "#333",  // Highlight text color on active
                })}
              >
                {({ isActive }) => (
                  <ListItemButton 
                    sx={{
                      borderRadius: 2, 
                      px: 2,
                      backgroundColor: isActive ? 'rgba(0, 173, 255, 0.2)' : 'transparent',  // Active background color
                      '&:hover': {
                        backgroundColor: isActive ? 'rgba(0, 173, 255, 0.3)' : 'rgba(0, 173, 255, 0.1)',  // Hover effect
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "#1976d2" : "#333",  // Active icon color
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
