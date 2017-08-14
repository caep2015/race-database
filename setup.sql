DROP DATABASE IF EXIST racedb;
CREATE DATABASE racedb;

CREATE TABLE runner(
  bib_id INTEGER auto_increment PRIMARY KEY,
  division VARCHAR(100),
  sponsor VARCHAR(100),
  name VARCHAR(100) NOT NULL
  FOREIGN KEY(venue_id) REFERENCES venue(venue_id)
);

CREATE TABLE race(
  race_id INTEGER SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  distance FLOAT NOT NULL,
  race_date DATETIME NOT NULL,
  venue_id INTEGER,
  FOREIGN KEY(venue_id) REFERENCES venue(venue_id)
);

CREATE TABLE venue(
  venue_id INTEGER SERIAL PRIMARY KEY,
  name VARCHAR(100),
  location VARCHAR(100)
);

CREATE TABLE result(
  race_id INTEGER,
  FOREIGN KEY(race_id) REFERENCES race(race_id),
  bib_id INTEGER,
  FOREIGN KEY(bib_id) REFERENCES runner(bib_id),
  result_time FLOAT NOT NULL,
  PRIMARY KEY (race_id, bib_id)
);
