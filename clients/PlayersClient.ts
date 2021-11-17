import { getRequest } from "./"

export interface Player {
    id: number,
    firstName: string,
    lastName: string,
    name: string,
    birth: {
        date: string,
        country: string,
        place: string
    },
    age: number,
    nationality: string,
    position: string,
    height: string,
    weight: string,
    injured: boolean,
    photo: string
}

class PlayersClient {
    constructor(private token: string | undefined) { }

    async getPlayersAsync(league: string, season: string, team: string) {
        const players: Player[] = [];
        const responseArray: any[] = [];

        let response = await getRequest<any>(`players?league=${league}&season=${season}&team=${team}&page=1`, this.token);
        responseArray.push(response);
        const maxPage = response.paging.total;

        for(let i = 2; i <= maxPage; i++){
            response = await getRequest<any>(`players?league=${league}&season=${season}&team=${team}&page=${i}`, this.token);
            responseArray.push(response);
        }
        
        for (let response of responseArray){
            for (let p of response.response) {
                let newPlayer: Player = {
                    id: p.player.id,
                    firstName: p.player.firstname,
                    lastName: p.player.lastname,
                    name: p.player.name,
                    birth: {
                        date: p.player.birth.date,
                        country: p.player.birth.country,
                        place: p.player.birth.place
                    },
                    age: p.player.age,
                    nationality: p.player.nationality,
                    position: p.statistics[0].games.position,
                    height: p.player.height,
                    weight: p.player.weight,
                    injured: p.player.injured,
                    photo: p.player.photo
                }

                players.push(newPlayer);
            }
        }
        
        return players;
    }
}

export default PlayersClient;