import Database from "better-sqlite3";
const db = new Database("app.db");

const query = `
    CREATE TABLE users(
    id INTERGER PRIMARY KEY,
     username STRING NOT NULL UNIQUE,
     password STRING NOT NULL)
`;
db.exec(query);