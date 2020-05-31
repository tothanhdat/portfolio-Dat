const route             = require('express').Router();
const moment            = require('moment');
const USER_MODEL        = require('../models/user');

const { renderToView }  = require('../utils/childRouting');


route.get('/login', async (req, res) => {
    res.render('dashboard/login')
})

route.post('/login', async (req, res) => {

    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    if(infoUser.error)
        return res.json(infoUser);
    
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.user = infoUser.data; 

    return res.json(infoUser)
})

route.post('/register', async (req, res) => {
    let { email, password, firstName, lastName } = req.body;
    let infoUser = await USER_MODEL.register(email, password, firstName, lastName);
    if (infoUser.error && infoUser.message == 'email_existed')
        res.json("Đăng ký thất bại")
    return res.json("Đăng ký thành công")
});



module.exports = route;
