import { InMemoryCache } from "apollo-cache-inmemory";
export default function (context) {
    return {
        httpLinkOptions: {
            uri: 'https://api.manga.cat/v1/graphql',
            credentials: 'same-origin'
        },
        cache: new InMemoryCache(),
        wsEndpoint: 'wss://api.manga.cat/v1/graphql',
    }
}