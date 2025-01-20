const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chatbot.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS responses (id INTEGER PRIMARY KEY, query TEXT, reply TEXT)');
    db.run('INSERT INTO responses (query, reply) VALUES ("hello", "Hi there!"), ("bye", "Goodbye!"), ("how are you", "I am just a bot, but I am fine!");');
});

const getResponse = (query) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT reply FROM responses WHERE query = ?', [query.toLowerCase()], (err, row) => {
            if (err) reject(err);
            resolve(row ? row.reply : null);
        });
    });
};

module.exports = { getResponse };
