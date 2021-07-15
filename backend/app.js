const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();
app.use(bodyParser.json());

app.use('/api/places',placesRoutes); // => /api/places/...
app.use('/api/users' , usersRoutes);

app.use((req, res, next)=>{
 const error = new HttpError('Could not find this route', 404);
 throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(5000);
	console.log('Connected to database');
  })
  .catch(err => {
    console.log(err);
  });
