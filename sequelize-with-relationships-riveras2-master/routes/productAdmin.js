const express = require('express');
const app = express();
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require('../models/Product');
const Card = require('../models/Card');



router.get('/', (req, res)=>{
  Product.findAll()
  .then((products)=>{
      res.render('admin/products/index', {products: products});
  })
  .catch((err)=>{console.log('Error Getting Products', err);});
});

router.get('/edit/:id', (req, res)=>{
  const id = req.params.id;
  Product.findByPk(id)
  .then((product) => {
    res.render('admin/products/edit', {product : product});
  })
  Card.findByPk(id)
  .then((card) => {
    res.render('admin/products/edit', {card : card});
  })

});

router.post('/edit/:id', (req, res)=>{
  const id = req.params.id;
  Product.findByPk(id)
  .then((product) => {
    product.name = req.body.name,
    product.description = req.body.description,
    product.price = req.body.price
    product.save()
    .then(()=>{
      res.redirect('/admin/products');
    })
  })
  Card.findByPk(id)
  .then((card) => {
    card.category = req.body.category
    card.save()
    .then(()=>{
      res.redirect('/admin/products');
    })
  })
});


router.get('/new', (req, res)=>{
  res.render('admin/products/new');
});

router.post('/new', (req, res)=>{
  //req.body.name
  Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }).then((product) => {
    Card.create({
      category: req.body.category
  }).then((card) => {
    product.setCard(card).then(() => {
      res.redirect('/admin/products/');
      console.log("card connected");
    });
  });
});
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
  .then((product) => {
    res.render('admin/products/product.pug', {product : product});
})
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Card.findByPk(id)
  .then((card) => {
      res.render('admin/products/product.pug', {card : card});
  })
});


router.post('/delete' , (req, res) => {
  const id = req.body.id;
  Product.findByPk(id)
  .then((product) => {
    product.destroy()
    .then(() =>{
      res.redirect('/admin/products');
    });

  });
});


module.exports = router;
