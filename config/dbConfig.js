const sqlite3 = require("sqlite3").verbose();

// Inisialisasi database
const db = new sqlite3.Database("./database/db.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Gagal terhubung ke database:", err.message);
    } else {
        console.log("Terhubung ke database SQLite.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            date_added TEXT NOT NULL
        )
    `);
});

module.exports = db;