const databaseName = 'database'

export const getFromDatabase = (table: string) => {
    // get database
    const database = JSON.parse(localStorage.getItem(databaseName) as string) ?? {};
    // get table
    const data = database[table] ?? []
    // return table 
    return data
}

export const storeToDatabase = (table: string, data: []) => {
    // get database
    const database = JSON.parse(localStorage.getItem(databaseName) as string) ?? {};
    // update table
    database[table] = data
    // save database
    localStorage.setItem(databaseName, JSON.stringify(database));
}
