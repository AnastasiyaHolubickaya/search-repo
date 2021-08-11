class ServerRequest {
    private baseURL = "https://api.github.com/users/";
    private static instance: ServerRequest;

    private constructor() {
    };

    static getInstance(): ServerRequest {
        if (typeof ServerRequest.instance === 'object') {
            return ServerRequest.instance;
        }
        ServerRequest.instance = new ServerRequest();
        return ServerRequest.instance;
    }

    getData(url: string) {
        return fetch(`${this.baseURL}${url}/repos`)
            .then(data => data.json())
    }
}

export const getRepositopies = ServerRequest.getInstance();