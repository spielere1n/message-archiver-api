const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Msg = new Schema({
    message: String
}, {
    collection: 'messages'
});

module.exports = mongoose.model('Msg', Msg);