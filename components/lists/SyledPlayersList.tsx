import Image from "next/dist/client/image";
import Box from "@mui/material/Box"
import { Player } from "../../clients/PlayersClient";
import { Avatar, createTheme, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, styled, ThemeProvider, Tooltip } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0";
import { Delete, KeyboardArrowDown, PersonRemove } from "@mui/icons-material";
import { ACTIONS } from "../../pages/teamSelection";

const StyledList = styled(List)<{ component?: React.ElementType }>({
    "& .MuiListItemButton-root": {
        paddingLeft: 24,
        paddingRight: 24,
    },
    "& .MuiListItemIcon-root": {
        minWidth: 0,
        marginRight: 16,
    },
    "& .MuiSvgIcon-root": {
        fontSize: 20,
    },
});

export default function DraftedPlayersList({ userTeam, open, dispatch }: any) {
    const  { user, isLoading }  = useUser();

    const fullName = (first: string, last: string) => {
        return `${first} ${last}`;
    }

    return (
        <div>
            <ThemeProvider
                theme={createTheme({
                    palette: {
                        mode: "dark",
                        primary: { main: "rgb(102, 157, 246)" },
                        background: { paper: "rgb(5, 30, 52)" }
                    }
                })}
            >
                <Paper elevation={2} 
                    sx={{
                        width: "100%", 
                        maxWidth: "400px",
                    }}
                >
                    <StyledList sx={{ width: "100%", maxWidth: "400px" }}>
                        <ListItem>
                            <ListItemIcon sx={{ fontSize: 20 }}>
                                {(user != undefined && user.picture != undefined) ? <Image src={user.picture} width="50" height="50"/> : <div>🔥</div>}    
                            </ListItemIcon>
                            <ListItemText
                                sx={{ my: 0 }}
                                primary={user != undefined ? user.name : "Placeholder"}
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    letterSpacing: 0,
                                }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                onClick={() => dispatch({ type: ACTIONS.TOGGLE_OPEN })}
                            >
                                <ListItemText
                                    primary="Your drafted Team:"
                                    primaryTypographyProps= {{
                                        color: "primary",
                                        fontWeight: "medium",
                                        variant: "body2",
                                    }}
                                />
                                <KeyboardArrowDown
                                    sx={{
                                        transform: open ? "rotate(-180deg)" : "rotate(0)",
                                        transition: "0.5s"
                                    }}
                                />
                            </ListItemButton>
                            <Tooltip title="Delete Team">
                                <IconButton
                                    size= "large"
                                    onClick={() => dispatch({ type: ACTIONS.RESET_USERTEAM })}
                                >
                                    <Delete sx={{ opacity: 0.6, "&:hover, &:focus": { opacity: 1 } }}/>
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        {open && userTeam && userTeam.map((player: Player) => (
                            <ListItem key={player.id}
                                sx={{ mb: 0.3 }}
                                secondaryAction={
                                    <IconButton edge="end" sx={{ mr: 1.5 }}
                                        onClick={() => dispatch({ type: ACTIONS.REMOVE_PLAYER, payload: { player: player } })}
                                    >
                                        <PersonRemove/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={player.photo}/>
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={fullName(player.firstName, player.lastName)}
                                    secondary={player.position}
                                />
                            </ListItem>
                        ))}
                    </StyledList>
                </Paper>
            </ThemeProvider>
        </div>
    )
}
