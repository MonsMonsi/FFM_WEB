import Image from "next/dist/client/image";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Delete, KeyboardArrowDown, PersonRemove } from "@mui/icons-material";
import { Player, FullName } from "../../clients/PlayersClient";
import { ACTIONS } from '../../pages/teamSelection';

export default function DraftedPlayersTable({ userTeam, open, dispatch }: any) {
    return (
        <>
            <TableContainer sx={{ maxHeight: "500px", border: "1px solid darkred" }}>
                <Table sx={{ width: "500px" }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <IconButton onClick={() => dispatch({ type: ACTIONS.TOGGLE_OPEN })}>
                                <KeyboardArrowDown
                                    sx={{
                                        transform: open ? "rotate(-180deg)" : "rotate(0)",
                                        transition: "0.5s"
                                    }}
                                />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6">Ihr gedraftetes Team:</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Delete Team">
                                    <IconButton
                                        size= "large"
                                        onClick={() => dispatch({ type: ACTIONS.RESET_USERTEAM })}
                                    >
                                        <Delete sx={{ opacity: 0.6, "&:hover, &:focus": { opacity: 1 } }}/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {open && userTeam.map((player: Player) => (
                            <TableRow key={player.id}>
                            <TableCell>
                                <Image src={player.photo} width="60px" height="60px" />
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">{FullName(player.firstName, player.lastName)}</Typography>
                                <Typography variant="body1">{player.position}</Typography>
                            </TableCell>
                            <TableCell>
                                <IconButton edge="end" aria-label="draft"
                                    onClick={() => dispatch({ type: ACTIONS.REMOVE_PLAYER, payload: { player: player } })}
                                >
                                    <PersonRemove />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}