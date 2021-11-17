export const baseUrl = "http://localhost:19046/api";

export async function getRequest<T>(url: string, token: string | undefined){
    const response = await fetch(`${baseUrl}/${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json() as T;
}