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
app.set('views','./views');

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
  res.render('addNew');
});

app.post('/addNew', (req, res, next) => {
  let addNew =
  `INSERT INTO runner (name, sponsor, division)
  VALUES(
    '${req.body.name}',
    '${req.body.sponsor}',
    '${req.body.division}'
  )`;
  db.query(addNew, (err)=> {
    if(err){
      return next(err);
    }
  res.redirect('/');
  });
});

app.get('/:id', (req, res, next) => {
  const id = req.params.id
  db.query(`SELECT * FROM runner WHERE bib_id = ${id}`, (err, results)=>{
    if (err){
      return next(err);
    }
    res.render('details', {
      runner: results.rows
    });
  });
});

app.listen(3000, () => {
  console.log('On your marks, get set...')
});
