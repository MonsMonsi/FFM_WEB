import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonAdd from "@mui/icons-material/PersonAdd"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Player } from '../../clients/PlayersClient';

export default function PlayersList(players: Player[]) {
    return (
        <List>
                {players && players.map(player => (
                    <ListItem key={player.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="draft">
                                <PersonAdd>
                                    
                                </PersonAdd>
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar src={player.photo}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={player.name}
                            secondary={player.position}
                        />
                    </ListItem>
                ))}
        </List>
    )
}