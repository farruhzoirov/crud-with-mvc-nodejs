const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

const userRoutes = require('./routes/routes');

app.use(userRoutes);






app.listen(5000);