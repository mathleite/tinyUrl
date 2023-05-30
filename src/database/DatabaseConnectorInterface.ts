import { DatabaseInput } from "./Types";

export default interface DatabaseConnectorInterface {
    create(input: DatabaseInput): void;
    get(input: DatabaseInput): any
}