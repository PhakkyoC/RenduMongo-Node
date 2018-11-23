/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//


/*
Model definition
*/
const messageSchema = new Schema({
    dateCrea: Date,
    emailAuthor: String,
    content: String,
})
//


/*
Export
*/
const MessageSchema = mongoose.model('message', messageSchema);
module.exports = MessageSchema;
//