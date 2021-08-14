class ServerRequest {
    private baseURL = "https://api.github.com/search/repositories";
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

    getData(url: string, currentPage: number, perPage: number) {
        return fetch(`${this.baseURL}?q=${url}&per_page=${perPage}&page=${currentPage}`)
            .then(data => data.json())
    }
}

export const getRepositopies = ServerRequest.getInstance();