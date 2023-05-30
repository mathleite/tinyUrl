export type DatabaseInput = {};
export type InMemoryDatabaseInput = DatabaseInput & {
    key: string,
    value: string,
}