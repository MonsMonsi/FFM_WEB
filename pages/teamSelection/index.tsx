import React, { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid";
import PersonAdd from "@mui/icons-material/PersonAdd"
import PlayersList from "../../components/players/PlayersList";
import PlayersClient, { Player } from "../../clients/PlayersClient";
import List from "@mui/material/List";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

const teamIds: any = {
    "2020": {
        "78": [ "157", "159", "160", "161", "162", "163", "164", "165", "167", "168", "169", "170", "172", "173", "174", "182", "188", "192" ],
        "61": [ "80" ],
        "39": [ "33" ]
    },
    "2021": {
        "78": [ "157" ],
        "61": [ "80" ],
        "39": [ "39" ]
    }
}

interface State {
    league: string,
    season: string,
    players: Player[]
}

const initialState: State = {
    league: "",
    season: "",
    players: []
}

const TeamSelection = () => {
    const [ state, setState ] = useState(initialState);

    const handleSetLeague = (event: any) => {
        setState({
            ...state,
            league: event.target.value
        });
    }

    const handleSetSeason = (event: any) => {
        setState({
            ...state,
            season: event.target.value
        });
    }

    useEffect(() => {
        async function fetchData() {
            let players: Player[] = [];
            const client = new PlayersClient(undefined);

            if (state.league != "" && state.season != ""){
                for (let team of teamIds[state.season][state.league]){
                    const response = await client.getPlayersAsync(state.league, state.season, team);
                    players = [...players, ...response];
                }
            }

            setState({
                ...state,
                players
            });
        }

        fetchData();
    }, [ state.league, state.season ]);

    return (
        <div>
            <Grid container
                spacing={25}
            >
                <Grid item>
                    <Box
                        sx={{
                            border: "2px solid darkslategrey",
                            width: 220,
                            height: 200,
                            textAlign: "center",
                            paddingTop: 2
                        }}
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">League</FormLabel>
                            <RadioGroup
                                aria-label="League"
                                // defaultValue="     "
                                name="league-buttons"
                                value={state.league}
                                onChange={handleSetLeague}
                            >
                                <FormControlLabel value="78" control={<Radio/>} label="1. Bundesliga"/>
                                <FormControlLabel value="61" control={<Radio/>} label="Ligue 1"/>
                                <FormControlLabel value="39" control={<Radio/>} label="Premier League"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            border: "2px solid darkslategrey",
                            width: 220,
                            height: 200,
                            textAlign: "center",
                            paddingTop: 2
                        }}
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Season</FormLabel>
                            <RadioGroup
                                aria-label="Season"
                                // defaultValue="     "
                                name="season-buttons"
                                value={state.season}
                                onChange={handleSetSeason}
                            >
                                <FormControlLabel value="2020" control={<Radio/>} label="2020/21"/>
                                <FormControlLabel value="2021" control={<Radio/>} label="2021/22"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <List
                sx={{
                    width: "50%"
                }}
            >
                {state.players && state.players.map(player => (
                    <ListItem key={player.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="draft">
                                <PersonAdd>

                                </PersonAdd>
                            </IconButton>
                        }
                        sx={{
                            border: "1px solid darkslategrey",
                            marginTop: 0.3
                        }}
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
        </div>
    )
}

export default TeamSelection;