import Image from "next/dist/client/image";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Player, FullName } from "../../clients/PlayersClient";
import { ACTIONS } from '../../pages/teamSelection';

export default function PlayersTable({ players, userTeam, dispatch }: any) {
    const positions = [ "Goalkeeper", "Defender", "Midfielder", "Attacker" ];
    
    const countPosition = (position: string) => {
        const count: number = userTeam.reduce((count: number, current: Player) => {
            if(current.position == position){
                return count + 1;
            }
            return count;
        }, 0);
    
        return count;
    }
    
    const getPosition = () => {
        if (userTeam.length == 0){
            return "Goalkeeper";
        }
        if (countPosition("Goalkeeper") < 2){
            return "Goalkeeper"
        }
        if (countPosition("Defender") < 5){
            return "Defender"
        }
        if (countPosition("Midfielder") < 5){
            return "Midfielder"
        }
        if (countPosition("Attacker") < 4){
            return "Attacker"
        }
    }

    return (
        <>
            {userTeam && userTeam.length < 16 && (
                <TableContainer sx={{ maxHeight: "500px", border: "1px solid darkred" }}>
                    <Table sx={{ width: "500px" }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">
                                    <Typography variant="h6" noWrap>Wählen Sie einen {getPosition()}</Typography>
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players.filter((player: Player) => player.position == getPosition() && !userTeam.includes(player)).map((player: Player) => (
                                <TableRow key={player.id}>
                                    <TableCell>
                                        <Image src={player.photo} width="60px" height="60px" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">{FullName(player.firstName, player.lastName)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton edge="end" aria-label="draft"
                                            onClick={() => dispatch({ type: ACTIONS.DRAFT_PLAYER, payload: { player: player } })}
                                        >
                                            <PersonAdd />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}