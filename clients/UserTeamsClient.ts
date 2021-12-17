import { postRequest } from "./"
import { Player } from "./PlayersClient";

export interface UserTeam {
    name: string,
    players: Player[],
}

class UserTeamsClient {
    constructor(private token: string | undefined) { }

    async postUserTeamToDb(userTeam: UserTeam){
        await postRequest<any>("userteams", JSON.stringify(userTeam), this.token);
    }
}

export default UserTeamsClient;