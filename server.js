var mysql = require("mysql");
var express = require("express");
var apis = require("./routes/apis");
var public = require("./routes/public");

const app = express();
var PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(apis);
app.use(public);


app.listen(PORT, function() {
  console.log(`The app is now listening at this port: ${PORT}`);
});