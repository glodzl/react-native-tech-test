import {HttpLink} from 'apollo-link-http';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from "apollo-cache-inmemory";
import { baseURL } from "../api";


export const makeApolloClient = () => {
    const link = new HttpLink({uri: baseURL});
    const cache = new InMemoryCache()

    return new ApolloClient({link, cache});
}