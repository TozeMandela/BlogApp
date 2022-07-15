const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

/* config session e flash */
app.use(session({
    secret:'qualquerCoisaSegura',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

/* configurando um middleware */
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next()
})

/* config handlebars */
app.engine('handlebars', engine({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

/* config body-parser */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* public */
app.use(express.static(path.join(__dirname,'public')));

/* routs */
app.use('/admin',admin);

/* base de dados */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dataBlog').then(()=>{
    console.log('successful connection');
}).catch(e=>{
    console.log('erro...!')
});


const PORT =3000;
app.listen(PORT,()=>{
    console.log('servidor BlogApp rodando...')
})