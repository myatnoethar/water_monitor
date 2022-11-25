const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller');


//Initialize App
const app = express();

//Use Case
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//Routes
app.get('/api', controller.getWaterData);
app.post('/api', controller.postWaterData);

//Start up server
app.listen(3000);