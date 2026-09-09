export class GenericApiClient {
    private baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    public async get<T>(endponit: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endponit}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = (await response.json()) as T;
        return data;
    }
}