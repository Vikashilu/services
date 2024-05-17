export const dbConn = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "root",
    "database": "portfolio",
    "synchronize": true,
    "logging": false,
    "entities": [
        "dist/db/entity/*.js"
    ],
    "migrations": [
        "dist/db/migration/*.js"
    ],
    "cli": {
        "entitiesDir": "src/db/entity",
        "migrationsDir": "src/db/migration"
    }
}