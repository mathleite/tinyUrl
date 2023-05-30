import {createClient, RedisClientType} from 'redis';
import DatabaseConnectorInterface from "../DatabaseConnectorInterface";
import {InMemoryDatabaseInput} from "../Types";

export default class RedisConnector implements DatabaseConnectorInterface {
    private client: RedisClientType

    constructor() {
        this.client = createClient({
            url: 'redis://redis:6379',
        });
        this.client.on('error', err => console.log('Redis Client Error', err));
    }

    async create(input: InMemoryDatabaseInput): Promise<void> {
        await this.client.connect();
        await this.client.set(input.key, input.value, {
            EX: 60
        });
        await this.client.disconnect();
    }

    async get(key: string): Promise<any> {
        await this.client.connect();
        const response = await this.client.get(key);
        await this.client.disconnect();
        return response;
    }
}