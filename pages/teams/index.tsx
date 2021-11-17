import { Box, Grid, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import TeamsClient, { Team } from "../../clients/TeamsClient";
import TeamsList from "../../components/teams/TeamsList";

interface State {
    league: string,
    season: string,
    teams: Team[]
}

const initialState: State = {
    league: "",
    season: "",
    teams: []
}

const Teams = () => {
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
            const client = new TeamsClient(undefined);

            if (state.league != "" && state.season != ""){
                const response = await client.getTeamsAsync(state.league, state.season);

                setState({
                    ...state,
                    teams: response
                })
            }
        }

        fetchData();
    }, [ state.league, state.season ]);

    return (
        <div>
            <Grid container
                spacing={5}
                sx={{
                    marginBottom: 5
                }}
            >
                <Grid item
                    xs={12} sm={6} md={6}
                    sx={{
                        justifyItems: "center"
                    }}
                >
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="league-select-label">League</InputLabel>
                            <Select
                                labelId="league-select-label"
                                id="league-select"
                                value={state.league}
                                label="League"
                                onChange={handleSetLeague}
                            >
                                <MenuItem value="78">1.Bundesliga</MenuItem>
                                <MenuItem value="61">Ligue 1</MenuItem>
                                <MenuItem value="39">Premier League</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item
                    xs={12} sm={6} md={6}
                > 
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="season-select-label">Season</InputLabel>
                            <Select
                                labelId="season-select-label"
                                id="season-select"
                                value={state.season}
                                label="Season"
                                onChange={handleSetSeason}
                            >
                                <MenuItem value={"2021"}>2021/22</MenuItem>
                                <MenuItem value={"2020"}>2020/21</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>       
                </Grid>
            </Grid>
            {state.teams && (
                <TeamsList teams={state.teams} league={state.league} season={state.season}/>
            )}
        </div>
    )
}

export default Teams;