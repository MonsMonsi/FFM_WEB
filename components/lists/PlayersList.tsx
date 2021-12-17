import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonAdd from "@mui/icons-material/PersonAdd"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Player } from '../../clients/PlayersClient';
import { ACTIONS } from '../../pages/teamSelection';

export default function PlayersList({ players, userTeam, dispatch }: any) {
    const getPosition = () => {
        let position: string;

        switch (userTeam.length) {
        case 1:
            position = "Defender";
            break;
        case 2:
            position = "Midfielder";
            break;
        case 3:
            position = "Attacker";
            break;
        default:
            position  = "Goalkeeper";
            break;
        }

    return position;
    }

    const fullName = (first: string, last: string) => {
        return `${first} ${last}`;
    }
    return (
        <List sx={{ width: "100%", maxWidth: "400px" }}>
            {players && players.filter((player: Player) => player.position == getPosition() && !userTeam.includes(player)).map((player: Player) => (
                <ListItem key={player.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="draft"
                            onClick={() => dispatch({ type: ACTIONS.DRAFT_PLAYER, payload: { player: player } })}
                        >
                            <PersonAdd />
                        </IconButton>
                    }
                    sx={{
                        border: "1px solid darkslategrey",
                        marginBottom: 0.3
                    }}
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
        </List>
    )
}