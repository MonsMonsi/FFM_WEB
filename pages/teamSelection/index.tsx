import { useEffect, useReducer } from "react";
import Grid from "@mui/material/Grid";
import PlayersClient, { Player } from "../../clients/PlayersClient";
import { Chip, Divider, Container, Typography } from "@mui/material";
import RadioButtonGroupSimple from "../../components/radioButtons/RadioButtonGroupSimple";
import PlayersList from "../../components/lists/PlayersList";
import DraftedPlayersList from "../../components/lists/DraftedPlayersList";

// ACTIONS variable for reducer function
export const ACTIONS = {
    SET_LEAGUE: "set-league",
    SET_PLAYERS: "set-players",
    CLEAR_PLAYERS: "clear-players",
    DRAFT_PLAYER: "draft-player",
    RESET_USERTEAM: "reset-userteam",
    TOGGLE_OPEN: "toggle-open"
}

// reducer function
function reducer(state: State, action: any){
    switch(action.type){
        case ACTIONS.SET_LEAGUE:
            return { ...state, league: action.payload.id };
        case ACTIONS.SET_PLAYERS:
            return { ...state, players: action.payload.players };
        case ACTIONS.CLEAR_PLAYERS:
            return { ...state, players: [] };
        case ACTIONS.DRAFT_PLAYER:
            return { ...state, userTeam: [ ...state.userTeam, action.payload.player ] };
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
    league: string,
    players: Player[],
    userTeam: Player[],
    open: boolean
}

const initialState: State = {
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

    return (
        <div>
            <Container>
                <Typography variant="h3"
                    sx={{ mb: 5, width: "100%", color: "darkred", backgroundColor: "azure", border: "1px solid darkred" }}
                >
                    Stellen Sie nun ihr Team zusammen!    
                </Typography>
            </Container>
            <Grid container rowSpacing={2} columnSpacing={5}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5">
                        Bitte wählen Sie eine Liga!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RadioButtonGroupSimple content={RadioButtonsContentLeague} dispatch={dispatch}/>
                </Grid>
            </Grid>

            <Divider sx={{ mt: 8, mb: 8 }}>
                <Chip label={(state.league != "") ? "Pick your Team" : "Choose a League"} sx={{ color: "azure", backgroundColor: "darkred" }}/>
            </Divider>

            {state.league != "" &&(
                <Grid container
                justifyContent="center"
            >
                {/* List of drafted Players */}
                <Grid item xs={12} sm={6}>
                    <DraftedPlayersList userTeam={state.userTeam} open={state.open} dispatch={dispatch} />
                </Grid>
                {/* List of available Players */}
                <Grid item xs={12} sm={6}>
                    <PlayersList players={state.players} userTeam={state.userTeam} dispatch={dispatch} />
                </Grid>
            </Grid>
            )}
        </div>
    )
}

export default TeamSelection;