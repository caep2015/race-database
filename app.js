const express = require('express');
const mustacheExpress = require('mustache-express');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express()


//add from https://node-postgres.com/guides/project-structure
//change data to apply change users to runners
//run db query truncated to res, change res to results in (err, res)


app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + './views');

app.get('/', (req, res, next) => { //res = response here
  db.query('SELECT * FROM runner', [], (err, results) => {
    if (err) {
      return next(err)
    }
// render mustache template - spit out first record
    res.render('index', {
      runner: results.rows
    });
  });
});

app.get('/addNew', (req, res) => {
  res.render('add')
})

app.post('/addNew', (req, res, next) => {
  db.query('INSERT INTO runner (name, sponsor, division) VALUES($1, $2, $3)'
  [req.body.name, req.body.sponsor, req.body.division], (err, results) => {
    if(err){
      return next(err);
    }
  res.redirect('/');
  });
});

app.get('/:bib_id', (req, res, next) => {
  console.log(req.params.bib_id);
  const runnerId = parseInt(req.params.bib_id) -1;
  db.query('SELECT * FROM runner', [], (err, results)=>{
    if (err){
      return next(err);
    }
    response.render('details', {
      runner: results.rows[runnerId]});
  });
});

app.listen(3000, () => {
  console.log('On your marks, get set...')
});
