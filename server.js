const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const uniqid = require('uniqid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/api/notes', function (req, res) {
  let notesData = fs.readFileSync("./db/db.json");
  notesData = JSON.parse(notesData);
  res.json(notesData)
});

app.post('/api/notes', function (req, res) {
  let notesData = fs.readFileSync("./db/db.json");
  notesData = JSON.parse(notesData);
  req.body.id = uniqid();
  notesData.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(notesData));
  res.end();
});

app.delete('/api/notes/:id', function (req, res) {
  let notesData = fs.readFileSync("./db/db.json");
  let getID = notesData.findIndex(x => x.id === req.params.id);
  notesData = JSON.parse(notesData);
  notesData.splice(getID, 1);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
  res.end();
})
