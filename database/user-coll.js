const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

    //Thông tin đăng ký 

    firstName: String,

    lastName: String,

    email: { type: String, required: true, unique: true },

    password: String,

    // Thông tin bổ sung

    avatar: String,

    birthday : Date,

    age: String,

    story: String,

    phone: String,

    city: String,

    website: String,

    role: { type: Number, default: 0 },
    
    //Công việc hiện tại
    job: [{
        type: String,
        default: []
    }],

    //Từng làm việc
    work_place: [{
        type: String,
        default: []
    }],

    //Bạn bè (Khi )
    friends: [{
        type: Schema.Types.ObjectId,
        ref : "friends_say"
    }],

    
});

const USER_MODEL = mongoose.model('user', userSchema);
module.exports  = USER_MODEL;