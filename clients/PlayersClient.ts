import { getRequest } from "./"

// interfaces
// export interface Player {
//     id: number,
//     firstName: string,
//     lastName: string,
//     name: string,
//     birth: {
//         date: string,
//         country: string,
//         place: string
//     },
//     age: number,
//     nationality: string,
//     position: string,
//     height: string,
//     weight: string,
//     photo: string,
//     team: Team,
// }

// export interface Team {
//     id: number,
//     name: string,
//     logo: string,
//     league: League,
// }

// export interface League {
//     id: number,
//     name: string,
//     country: string,
//     logo: string,
//     flag: string,
// }

export interface Player {
    id: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    birthCountry: string,
    birthPlace: string,
    nationality: string,
    height: string,
    weight: string,
    position: string,
    photo: string,
    teamId: number,
    team: {
        id: number,
        name: string,
        logo: string,
        leagueId: number,
        league: {
            id: number,
            name: string,
            country:string,
            logo: string,
            flag: string,
        }
    }
}

class PlayersClient {
    constructor(private token: string | undefined) { }

    async getPlayersFromDb(league: string){
        const players: Player[] = [];
        let response = await getRequest<Player[]>(`players?league=${league}`, this.token);

        for (let p of response) {
            players.push(p); 
        }

        return players;
    }
}

export default PlayersClient;