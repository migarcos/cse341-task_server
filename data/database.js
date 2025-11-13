const dotenv = require('dotenv');
dotenv.config();

// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('DB is already installed');
        return callback(null, database);
    } 
    MongoClient.connect(process.env.MONGODB_URI)
        .then( (client) => {
            database = client;
            callback(null, database);
        }).catch((err) => {
            callback(err);
        });
};


const getDatabase = () => {
    if (!database) {
        throw Error(' Database not initialized')
    } 
    return database;
};

module.exports = { 
    initDb, 
    getDatabase 
};




//  * ASYNC / AWAIT VERSION *
// const initDb = async (callback) => {
//   if (database) {
//     console.log('DB is already installed');
//     return callback(null, database);
//   }

//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     database = client;
//     callback(null, database);
//   } catch (err) {
//     callback(err);
//   }
// };

//  ASYNC / AWAIT generate error calling getDatabase
// const { MongoClient } = require('mongodb');

// let database;

// const initDb = async (callback) => {
//   if (database) {
//     console.log('✅ DB is already initialized');
//     return callback(null, database);
//   }

//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     database = client.db(); // ✅ direct acces to DB object
//     console.log('✅ DB connected successfully');
//     callback(null, database);
//   } catch (err) {
//     console.error('❌ DB connection error:', err);
//     callback(err);
//   }
// };