const express = require('express');
const db = require('./db');

//add from https://node-postgres.com/guides/project-structure
//change data to apply change users to runners
//run db query truncated to res, change res to results in (err, res)
app.get('/:id', (req, res, next) => { //res = response here
  db.query('SELECT * FROM runners', [], (err, results) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows) //change to render mustache template - spit out first record
  })
})
