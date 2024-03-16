-- SQLite
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    status TEXT
);