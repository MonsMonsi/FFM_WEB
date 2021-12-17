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

export async function postRequest<T>(url: string, data: string, token: string | undefined){
    const response = await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: data
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.statusText;
}