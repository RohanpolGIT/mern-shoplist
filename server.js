const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Body parser middleware

app.use(bodyParser.json());

// mongo db config

const db = require('./config/keys').mongoURI;

// connection to mongo DB

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('MongoDB Connection established...'))
    .catch(err => console.log(err));

app.use('/api/items',items);

// server static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));