import { getRequest } from "./"

// export interface Team {
//     team: {
//         id: number,
//         name: string,
//         country: string,
//         founded: number,
//         national: boolean,
//         logo: string
//     },
//     venue: {
//         id: number,
//         name: string,
//         address: string,
//         city: string,
//         capacity: number,
//         surface: string,
//         image: string
//     }
// }

export interface Team {
    id: number,
    name: string,
    logo: string,
    leagueId : number,
    league: {
        id: number,
        name: string,
        country: string,
        logo: string,
        flag: string,
    }
}

class TeamsClient {
    constructor(private token: string | undefined) { }

    async getAllTeamsAsync() {
        const response = await getRequest<Team>(`teams/all`, this.token);
        
        return response;
    }
}

export default TeamsClient;