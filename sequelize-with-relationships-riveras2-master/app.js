const express = require('express');
const app = express();
const router = express.Router();
const querystring = require('querystring');
const path = require('path');
const port = 8080;
const sequelize = require('./utils/sequelize');
const indexRouter = require('./routes/index');
const productAdminRouter = require('./routes/productAdmin');
const Product = require('./models/Product');
const Card = require('./models/Card');

app.use(express.urlencoded({extended:false}));

app.use('/', express.static('public'));

//app.use(express.static('public'));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/admin/products', productAdminRouter);

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/', (req, res)=>{
  res.redirect('/admin/products/category.pug');
});

sequelize.authenticate()
  .then(()=> {
    console.log("Successfully authenticated");
    app.listen(port);

  sequelize.sync()
    .then(() => {
      console.log(" Yay it worked(Model)");

    })
    .catch((err) => {
      concole.log("Nope didn't work", err);
    });
  })
  .catch((err) => {
    console.log("Could Not authenticate:", err);
  });
