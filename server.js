const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bot = require('./archiver-bot/bot');
const mongoose = require('mongoose');
const config = require('./config/database');

let Msg = require('./models/messages');

const app = express();

const port = process.env.PORT || 4000;

//Connect db
mongoose.connect(config.database, {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connection established');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.set('view engine', 'pug');

//Read
app.get('/', (req, res) => {
    message = [];

    Msg.find((err, msg) => {
        if(err) {
            console.log(err);
        } else {
            for(var i = 0; i < msg.length; i++) {
                message.push(msg[i].message);
            }
            res.json(message);
        }
    });
});

//Delete
app.get('/delete/:id', (req, res) => {
    Msg.findByIdAndRemove({_id: req.params._id}, (err, msg) => {
        if(err) {
            res.json(err);
        } else {
            res.json('Successfully removed');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port:${port}`);
});