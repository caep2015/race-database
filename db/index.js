//moved from app.js
const { Client } = require('pg');

//change pool to client
const client = new Client({  // change values to match db
  user: 'carlotapearl',// change dbuser to username
  host: 'localhost',//change to localhost
  database: 'racedb', //make db name
  password: '', //change to empty string
  port: 5432, // change to port 5432
})

client.connect();//connects postgress - move

//
