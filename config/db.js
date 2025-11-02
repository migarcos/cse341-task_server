const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

// const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.klll7qw.mongodb.net/?appName=Cluster0`;
const uri = `mongodb+srv://migarcos:tBUbk4Kc1ehC8lwve@cluster0.klll7qw.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('project1');
        console.log('Connection Success!');
    } catch (err) {
        console.error(`${err} Error connecting to MongoDB`);
        throw err;
    }
}

function getDB() {
    if (!db) throw new Error('DB connection failed');
    return db;
}

module.exports = { connectDB, getDB };
