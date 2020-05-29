const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const expressSession    = require('express-session');
// const multer            = require('multer');

const USER_ROUTER   = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressSession({
    secret: 'portfolio_dat',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 * 100
    }
}))

app.use('/user', USER_ROUTER);

app.get('/', async (req, res) => {
    res.render('pages/home')
})

const uri = 'mongodb://localhost/portfolio_dat';
const PORT = process.env.PORT || 3000;

mongoose.set('useCreateIndex', true); //ẩn cảnh báo
mongoose.set('useUnifiedTopology', true); // ẩn cảnh báo

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});