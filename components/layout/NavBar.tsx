import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from "@auth0/nextjs-auth0"
import React, { useState } from 'react';
import { Box, Drawer, IconButton, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

export const navBarHeight = 65;
export const drawerWidth = 170;
const pages: Page[] = [ { id: 1, text: "Create a Team", route: "/teamSelection" } ];
const options = ["Profile", "Logout"]

// interfaces
interface Page {
    id: number,
    text: string,
    route: string,
}

interface State {
    drawerOpen: boolean,
}

const initialState: State = {
    drawerOpen: false,
}

export const NavBar = () => {
    const { user } = useUser();
    const [ state, setState ] = useState(initialState);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")){
            return;
        }
    
        setState({ ...state, drawerOpen: open});
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                sx={{ height: navBarHeight, color: "azure", backgroundColor: "darkred" }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon onClick={toggleDrawer(!state.drawerOpen)} sx={{ ml: 1, mr: 3 }}/>
                    </IconButton>
                    <Drawer sx={{ width: `${drawerWidth}px` }}
                        anchor="left"
                        open={state.drawerOpen}
                        onClose={toggleDrawer(!state.drawerOpen)}
                    >
                        <List
                            sx={{ 
                                color: "azure", backgroundColor: "red"
                            }}
                        >
                            {pages.map((page: Page) => (
                                <ListItem button component={Link} href={page.route} key={page.id}>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={page.text}/>
                                    {/* <Link href="/teamSelection"/> */}
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1, color: "azure", textDecoration: "none"}}>
                        Home
                    </Typography>
                    {user ? (<Button href="/api/auth/logout" color="inherit">Logout</Button>) : (<Button href="/api/auth/login" color="inherit">Login</Button>)}
                </Toolbar>
            </AppBar>
        </Box>
    )
}




