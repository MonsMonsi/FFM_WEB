import { useEffect, useReducer } from "react";
import Grid from "@mui/material/Grid";
import PlayersClient, { Player } from "../../clients/PlayersClient";
import { Chip, Divider } from "@mui/material";
import RadioButtonGroupSimple from "../../components/radioButtons/RadioButtonGroupSimple";
import PlayersList from "../../components/lists/PlayersList";
import DraftedPlayersList from "../../components/lists/DraftedPlayersList";

// teamId-Array 
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

// ACTIONS variable for reducer function
export const ACTIONS = {
    SET_LEAGUE: "set-league",
    SET_SEASON: "set-season",
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
        case ACTIONS.SET_SEASON:
            return { ...state, season: action.payload.id };
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

const RadioButtonsContentSeason = {
    name: "season-buttons",
    formLabel: "Season",
    formControlLabel: [ { value: "2020", label: "2020/21" }, { value: "2021", label: "2021/22" } ],
    action: ACTIONS.SET_SEASON
}

// state interface, initialState
interface State {
    league: string,
    season: string,
    players: Player[],
    userTeam: Player[],
    open: boolean
}

const initialState: State = {
    league: "",
    season: "",
    players: [],
    userTeam: [],
    open: true
}

const TeamSelection = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

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

            dispatch({ type: ACTIONS.SET_PLAYERS, payload: { players: players } })
        }

        fetchData();
    }, [ state.league, state.season ]);

    return (
        <div>
            <Grid container
                spacing={25}
            >
                {/* RadioButtonGroup - choose league */}
                <Grid item>
                    <RadioButtonGroupSimple content={RadioButtonsContentLeague} dispatch={dispatch}/>
                </Grid>
                {/* RadioButtonGroup - choose season */}
                <Grid item>
                    <RadioButtonGroupSimple content={RadioButtonsContentSeason} dispatch={dispatch}/>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: 5, marginBottom: 5 }}>
                <Chip label={(state.league != "" && state.season != "") ? "Pick your team" : "Choose a League and a Season"}/>
            </Divider>
            <Grid container
                spacing={5}
            >
                {/* List of drafted Players */}
                <Grid item>
                    <DraftedPlayersList userTeam={state.userTeam} open={state.open} dispatch={dispatch} />
                </Grid>
                {/* List of available Players */}
                <Grid item>
                    <PlayersList players={state.players} userTeam={state.userTeam} dispatch={dispatch} />
                </Grid>
            </Grid>
            
        </div>
    )
}

export default TeamSelection;