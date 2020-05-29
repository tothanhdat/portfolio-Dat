const route             = require('express').Router();
const USER_MODEL        = require('../models/user');

const { renderToView }  = require('../utils/childRouting');


route.post('/register', async (req, res) => {
    let { email, password, fullname } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname);
    if (infoUser.error && infoUser.message == 'email_existed')
        res.json("Đăng ký thất bại")
    return res.json("Đăng ký thành công")
});

route.post('/login', async (req, res) => {

    let { email, password } = req.body;
    let infoUser = await USER_MODEL.signIn(email, password);

    console.log({ infoUser })

    if(infoUser.error)
        return res.json(infoUser);
    
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    req.session.email = req.body.email; 
    req.session.user = infoUser.data; 

    return res.json("Đăng nhập thành công")
})

module.exports = route;
