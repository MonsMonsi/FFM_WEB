import Image from "next/image"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import gridStyles from "../../../styles/Grid.module.css"
import PlayersClient from "../../../clients/PlayersClient"

const PlayerStats = ({ squad, playerId }: any) => {
    let player;

    for (let p of squad){
        if (p.id == playerId){
            player = p;
        }
    }
    
    return (
        <div>
             <Card
            >
                <CardHeader>
                    
                </CardHeader> 
                    
                <CardContent>
                    <Grid container
                    >
                        <Grid item className={gridStyles.item}>
                            <Image src={player.photo} width="100" height="100"></Image>
                        </Grid>
                        <Grid item className={gridStyles.item}>
                            <h2>{player.name}</h2>
                            <h4>{player.position}</h4>
                        </Grid>
                        <Grid item className={gridStyles.item}> 
                            <h2>{player.nationality}</h2>
                            <h4>Age: {player.age}</h4>
                        </Grid>
                        <Grid item className={gridStyles.item}>
                            <h2>{player.height}</h2>
                            <h4>{player.weight}</h4>
                        </Grid>
                    </Grid>
                    <hr/>
                    {/* <Grid container spacing={50}>
                        <Grid item>
                            <h2>{playerData.statistics[0].league.name}</h2>
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                    <Grid container spacing={25}>
                        <Grid item>
                            <h4>Appearences:</h4>
                            <h4>Lineups:</h4>
                            <h4>Minutes:</h4>
                            <hr/>
                            <h4>Goals:</h4>
                            <h4>Assists:</h4>
                            <hr/>
                            <h4>Yellow-Cards:</h4>
                            <h4>Yellow-Red-Cards:</h4>
                            <h4>Red-Cards:</h4>
                        </Grid>
                        <Grid item>
                            <h4>{playerData.statistics[0].games.appearences}</h4>
                            <h4>{playerData.statistics[0].games.lineups}</h4>
                            <h4>{playerData.statistics[0].games.minutes}</h4>
                            <hr/>
                            <h4>{playerData.statistics[0].goals.total}</h4>
                            <h4>{playerData.statistics[0].goals.assists != null ? playerData.statistics[0].goals.assists : 0}</h4>
                            <hr/>
                            <h4>{playerData.statistics[0].cards.yellow}</h4>
                            <h4>{playerData.statistics[0].cards.yellowred}</h4>
                            <h4>{playerData.statistics[0].cards.red}</h4>
                        </Grid>
                    </Grid> */}
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </div>
    )
}

export default PlayerStats;

export async function getServerSideProps(context: any) {
    const params = context.params.id.split("-");

    const league = params[0];
    const season = params[1];
    const team = params[2];
    const playerId = params[3];

    const client = new PlayersClient(undefined);

    const squad = await client.getPlayersAsync(league, season, team);

    return {
        props: {
            squad,
            playerId
        }
    } 
}