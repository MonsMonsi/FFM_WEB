import { useEffect, useReducer } from "react";
import PlayersClient, { Player } from "../../clients/PlayersClient";
import UserTeamsClient, { UserTeam } from "../../clients/UserTeamsClient";
import { Chip, Divider, Container, Typography, IconButton, TextField, Grid } from "@mui/material";
import { SaveAltSharp } from "@mui/icons-material";
import RadioButtonGroupSimple from "../../components/radioButtons/RadioButtonGroupSimple";
import PlayersTable from "../../components/tables/PlayersTable";
import DraftedPlayersTable from "../../components/tables/DraftedPlayersTable";

// ACTIONS variable for reducer function
export const ACTIONS = {
    SET_TEAMNAME:  "set-teamname",
    SET_LEAGUE: "set-league",
    SET_PLAYERS: "set-players",
    CLEAR_PLAYERS: "clear-players",
    DRAFT_PLAYER: "draft-player",
    REMOVE_PLAYER: "remove-player",
    RESET_USERTEAM: "reset-userteam",
    TOGGLE_OPEN: "toggle-open"
}

// reducer function
function reducer(state: State, action: any){
    switch(action.type){
        case ACTIONS.SET_TEAMNAME:
            return { ...state, teamName: action.payload.name };
        case ACTIONS.SET_LEAGUE:
            return { ...state, league: action.payload.id };
        case ACTIONS.SET_PLAYERS:
            return { ...state, players: action.payload.players };
        case ACTIONS.CLEAR_PLAYERS:
            return { ...state, players: [] };
        case ACTIONS.DRAFT_PLAYER:
            return { ...state, userTeam: [ ...state.userTeam, action.payload.player ] };
        case ACTIONS.REMOVE_PLAYER:
            let newUserTeam = state.userTeam.filter(p => p != action.payload.player); 
            return { ...state, userTeam: [ ...newUserTeam ] };
        case ACTIONS.RESET_USERTEAM:
            return { ...state, userTeam: [] }
        case ACTIONS.TOGGLE_OPEN:
            return { ...state, open: !state.open }
        default:
            return state;
    }
}

// objects for component-information
const RadioButtonsContentLeague = {
    name: "league-buttons",
    formLabel: "League",
    formControlLabel: [ { value: "78", label: "1. Bundesliga" }, { value: "61", label: "Ligue 1" }, { value: "39", label: "Premier League" } ],
    action: ACTIONS.SET_LEAGUE
}

// state interface, initialState
interface State {
    teamName: string,
    league: string,
    players: Player[],
    userTeam: Player[],
    open: boolean
}

const initialState: State = {
    teamName: "",
    league: "",
    players: [],
    userTeam: [],
    open: true
}

const TeamSelection = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchData() {
            const client = new PlayersClient(undefined);

            if (state.league != ""){
                const response = await client.getPlayersFromDb(state.league);
                dispatch({ type: ACTIONS.SET_PLAYERS, payload: { players: response } })
            }
        }

        fetchData();
    }, [ state.league ]);

    const handleSaveUserTeam = async() => {
        const userTeam: UserTeam = {
            name: state.teamName,
            players: state.userTeam,
        }
        const client = new UserTeamsClient(undefined);

        await client.postUserTeamToDb(userTeam);
    }

    return (
        <>
            <main>
                <Typography variant="h2" gutterBottom>
                    Bitte stellen Sie ihr Team zusammen!
                </Typography>

                <Grid container justifyContent="center" alignItems="center" spacing={10}>
                    <Grid item>
                        <Typography variant="h6">
                            Wie soll ihr Team heißen?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField id="name-input" required label="Teamname"/>
                    </Grid>
                </Grid>

                <IconButton>
                    <SaveAltSharp onClick={() => dispatch({ type: ACTIONS.SET_TEAMNAME, payload: { name: (document.getElementById("name-input") as HTMLInputElement).value } })}/>
                </IconButton>

                {state.teamName != "" && (
                    <>
                        <Grid container justifyContent="center" alignItems="center" spacing={10}>
                            <Grid item>
                                <Typography variant="h6">
                                    Bitte wählen Sie eine Liga!
                                </Typography>
                            </Grid>
    
                            <Grid item>
                                <RadioButtonGroupSimple content={RadioButtonsContentLeague} dispatch={dispatch}/>
                            </Grid>
                        </Grid>
    
                        <Divider sx={{ mt: 8, mb: 8 }}>
                            <Chip label="Pick your Team" sx={{ color: "azure", backgroundColor: "darkred" }}/>
                        </Divider>
                    </>
                )}

                {state.league != "" && (
                    <Grid container justifyContent="center" spacing={10}>
                        {/* Table of drafted Players */}
                        <Grid item>
                            <DraftedPlayersTable userTeam={state.userTeam} open={state.open} dispatch={dispatch} />
                        </Grid>
                        {/* Table of available Players */}
                        <Grid item>
                            <PlayersTable players={state.players} userTeam={state.userTeam} dispatch={dispatch} />
                        </Grid>
                </Grid>
                )}

                <Divider sx={{ mt: 8 }}>
                    <Chip label="Save Team" sx={{ 
                        backgroundColor: "darkgray", color: "azure", 
                        ...(state.userTeam.length == 16 && { backgroundColor: "darkred", color: "azure" }) 
                        }} 
                    />
                </Divider>

                <IconButton disabled={state.userTeam.length < 16 ? true : false}>
                    <SaveAltSharp onClick={handleSaveUserTeam}/>
                </IconButton>
            </main>  
        </>
    )
}

export default TeamSelection;



