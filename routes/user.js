const route             = require('express').Router();
const USER_MODEL        = require('../models/user');

const ROLE_ADMIN        = require('../utils/checkRole');

const { renderToView }  = require('../utils/childRouting');

route.get('/account-setting', async (req, res) => {
    let userID = req.query;
    let infoUser = await USER_MODEL.getInfo(userID);
    renderToView(req, res, 'dashboard/account-setting', { infoUser: infoUser.data })
})


module.exports = route;
