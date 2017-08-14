const express = require('express');
const mustacheExpress = require('mustache-express');
const db = require('./db');

let app = express();

//add from https://node-postgres.com/guides/project-structure
//change data to apply change users to runners
//run db query truncated to res, change res to results in (err, res)

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.get('/', (req, res, next) => { //res = response here
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
    res.send(results.rows[0]); //change to render mustache template - spit out first record
  });
});

app.listen(3000, () => {
  console.log('On your marks, get set...')
});
