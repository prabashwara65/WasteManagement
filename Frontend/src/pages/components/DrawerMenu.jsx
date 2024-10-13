import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

const DrawerMenu = ({ selectedItem, menuItems, onItemClick }) => {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', top: '64px' }, // Adjusted to be below AppBar
            }}
        >
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Menu</Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        selected={selectedItem === item.name}
                        onClick={() => onItemClick(item.name)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItem button onClick={() => alert("Logout clicked!")}>
                    <ListItemIcon>
                        {/* You can import and use a Logout icon here */}
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerMenu;
