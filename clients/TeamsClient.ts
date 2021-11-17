import { getRequest } from "./"

export interface Team {
    team: {
        id: number,
        name: string,
        country: string,
        founded: number,
        national: boolean,
        logo: string
    },
    venue: {
        id: number,
        name: string,
        address: string,
        city: string,
        capacity: number,
        surface: string,
        image: string
    }
}

class TeamsClient {
    constructor(private token: string | undefined) { }

    async getTeamsAsync(league: string, season: string) {
        const response = await getRequest<any>(`teams?league=${league}&season=${season}`, this.token);
        
        return response.response;
    }
}

export default TeamsClient;