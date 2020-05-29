const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//Người khác nói gì về bạn
const friendSaySchema = new Schema({

    avatar: String,

    content: String,

    fullname: String, //Biệt danh

    like: String, //Lượt thích
    
});

const FRIENDS_SCHEMA = mongoose.model('friends_say', friendSaySchema);
module.exports  = FRIENDS_SCHEMA;