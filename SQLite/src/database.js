
import Database from 'better-sqlite3';
const db = new Database('to-do.db');


db.prepare(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY,
    task TEXT,
    username TEXT
)`).run();

export default db;
