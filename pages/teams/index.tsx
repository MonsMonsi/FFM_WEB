import { Grid, Container } from "@mui/material";
import { useReducer, useEffect } from "react";
import TeamsClient, { Team } from "../../clients/TeamsClient";
import TeamsList from "../../components/lists/TeamsList";
import SelectStyled from "../../components/selects/SelectStyled";

// actions constant for reducer function
const ACTIONS = {
    SET_LEAGUE: "set-league",
    SET_SEASON: "set-season",
    SET_TEAMS: "set-teams"
}

// state interface and initial state
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

// reducer function
function reducer(state: State, action: any){
    switch(action.type){
        case ACTIONS.SET_SEASON:
            return { ...state, season: action.payload.id };
        case ACTIONS.SET_LEAGUE:
            return { ...state, league: action.payload.id };
        case ACTIONS.SET_TEAMS:
            return { ...state, teams: action.payload.teams }
        default:
            return state;
    }
}

// objects for component information
const SelectsContentLeague = {
    selectId: "league-select",
    inputLabelId: "league-select-label",
    inputLabelText: "League",
    menuItem: [ { value: "78", label: "1. Bundesliga" }, { value: "61", label: "Ligue 1" }, { value: "39", label: "Premier League" } ],
    action: ACTIONS.SET_LEAGUE,
}

const SelectsContentSeason = {
    selectId: "season-select",
    inputLabelId: "season-select-label",
    inputLabelText: "Season",
    menuItem: [ { value: "2020", label: "2020/21" }, { value: "2021", label: "2021/22" } ],
    action: ACTIONS.SET_SEASON,
}

const Teams = () => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchData() {
            const client = new TeamsClient(undefined);

            if (state.league != "" && state.season != ""){
                const response = await client.getTeamsAsync(state.league, state.season);

                dispatch({ type: ACTIONS.SET_TEAMS, payload: { teams: response } })
            }
        }

        fetchData();
    }, [ state.league, state.season ]);

    return (
        <Grid container
            justifyContent="space-evenly"
        >
            <Grid item>
                {/* Select - choose league */}
                <SelectStyled content={SelectsContentLeague} dispatch={dispatch} />
            </Grid>
            <Grid item>
                {/* Select - choose season */}
                <SelectStyled content={SelectsContentSeason} dispatch={dispatch} /> 
            </Grid>
            <Container>
                {state.teams && (
                    <TeamsList teams={state.teams} league={state.league} season={state.season}/>
                )}
            </Container>
        </Grid>
    )
}

export default Teams;