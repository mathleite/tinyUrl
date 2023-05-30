import type { ShortenerInput, ShortenerOutput } from "./Types";
import Hash from "../crypto/Hash";
import DatabaseConnectorInterface from "../../database/DatabaseConnectorInterface";

export default class Shortener {
    private databaseConnector: DatabaseConnectorInterface;
    constructor(databaseConnector: DatabaseConnectorInterface) {
        this.databaseConnector = databaseConnector;
    }

    async execute(input: ShortenerInput): Promise<ShortenerOutput> {
        const hash = Hash.generate(input.url);
        if (!await this.hasCache(hash)) {
            await this.databaseConnector.create({ key: hash, value: input.url  });
        }
        return {
            newUrl: this.buildNewUrl(hash)
        }
    }

    async retrieveOriginalUrl(input: ShortenerInput): Promise<ShortenerOutput> {
        if (!await this.hasCache(input.url)) throw new Error('TinyUrl not found');
        return {
            newUrl: await this.databaseConnector.get(input.url),
        }
    }

    private async hasCache(key: string): Promise<boolean> {
        return await this.databaseConnector.get(key) !== null;
    }

    private buildNewUrl(urlHash: string): string {
        const { APP_HOST } = process.env;
        return `${APP_HOST}/${urlHash}`;
    }
}