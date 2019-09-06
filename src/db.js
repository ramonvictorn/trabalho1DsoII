
const { Pool, Client } = require('pg');
const settings = require('./settings.js');
let pool; 
/**
 * @function initDb
 * @param {function} cb - Callback to run affer connection with databases 
 */
let initDb = function(cb){
    console.log(`db.js - initDb Connectin with database ${settings.DB_HOST}`)
    pool = new Pool({
        user: settings.DB_USER,  
        host: settings.DB_HOST,
        database: settings.DB_DATABASE,
        password: settings.DB_PASSWORD,
        port: settings.DB_PORT,
        // ssl: true
    })
    
    pool.connect((err, client, done) => {
        if(err){
            console.log('db.js: error -' , err)
            pool.end()
            process.exit(-1)
        }else{
            console.log('db.js - databases connected!')
            cb()
        }
    })
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
}



let query = function(query,values, cb){
    pool.query(query, values, (err, res) => {
        if(err){
            if(cb(err,res) == true){
                console.log('error, but return true')
            }else{
                console.log('error', err)
                pool.end()
                throw(new Error(`db.js: unhandled error`));
            }    
        }else{
            cb(err,res)
        }
    })
}

module.exports = {
    initDb,
    query,
}