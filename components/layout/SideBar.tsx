import { Drawer, Box, Link, List, ListItem, ListItemText } from "@mui/material"
import Logo from "./Logo";

export const drawerWidth = 170;
const options = [{ text: "Teams", route: "/teams"}, { text: "Pick a Team", route: "/teamSelection"}, { text: "Option 3", route: "/teams"}];

export default function SideBar() {
    return (
        <Box
            sx={{ 
                display: "flex"
            }}
        >
            <Drawer
                sx={{ 
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "lightgray"
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <Logo/>
                <List>
                    {options.map(o => (
                        <ListItem 
                            button
                            component={Link} href={o.route}
                            key={o.text}
                        >
                            <ListItemText primary={o.text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}