const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.use(apiRoutes);
app.use(publicRoutes);

app.listen(PORT, function() {
  console.log(`Your app is now up on port ${PORT}`);
})