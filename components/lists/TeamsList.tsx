import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { Team } from "../../clients/TeamsClient";
import TeamCard from "../cards/TeamCard"

export default function TeamsList({ teams, league, season }: any) {
    return (
        <Container>
            <Grid container 
                spacing={5}
            >
                {teams.map((t: Team) => (
                    <Grid item 
                        xs={12} sm={6} md={4}
                        key={t.team.id}
                    >
                        <TeamCard team={t.team} venue={t.venue} league={league} season={season}></TeamCard>
                    </Grid> 
                ))}
            </Grid>
        </Container>
    )
}