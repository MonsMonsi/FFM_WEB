import { getRequest } from "."

export interface User {
    id: number,
    identifier: string,
    email: string
}

class UserClient {
    constructor(private token: string | undefined) { }

    async getUserByIdentifier(identifier: string) {
        return await getRequest<User>(`users/${identifier}`, this.token)
    }
}

export default UserClient;