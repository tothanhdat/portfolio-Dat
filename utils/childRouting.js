const jwt               = require('./jwt.js');
const moment            = require('moment');
const USER_MODEL        = require('../models/user');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    let listUser = await USER_MODEL.getList();

    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
        
    } else {
        data.infoUser = undefined;
    }

    data.moment         = moment;
    data.listUser       = listUser.data;

    return res.render(view, data);
}
exports.renderToView = renderToView;