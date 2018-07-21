  var express = require('express');
  var bodyParser = require('body-parser')
  var app = express();
  var url = bodyParser.urlencoded({ extended: false })

  const mysql = require('mysql');
  const crypto = require('crypto');
  const secret = 'abcdefg';

  const fileUpload = require('express-fileupload');
  app.use(fileUpload());

  app.use(express.static(__dirname));

  var uniqid = require('uniqid');
  


  var cors = require('cors')
  app.use(cors());

  app.use(bodyParser.json());


  const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'usbw',
    database: 'bank_faldo'
  });

  db.connect();

  app.post('/login', function (req, res) {


    var sql = 'SELECT name,password,id FROM user_admin ';
    db.query(sql, (err, result) => {
      if (err) throw err;

      var user = [];
      var name = [];
      for (i = 0; i < result.length; i++) {
        if (result[i].name == req.body.username && result[i].password == req.body.password) {
          user.push(result[i].id)

          res.send(user);
        } else {
          res.end("0");
        }
      }
    });

  })
 
  app.get('/Contact', function (req, res) {

    var sql = 'SELECT * FROM contact';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result)
    });
  })

  app.post('/Contact/update', function (req, res) {

    var description = req.body.description;
    var address = req.body.address;
    var callcenter = req.body.callcenter;
    var elecronic = req.body.elecronic;
    var id = req.body.id

    var sql = 'UPDATE contact SET content=?,address=?, callcenter=? ,electronic_support=? WHERE id=?';

    db.query(sql, [description, address, callcenter, elecronic, id], (err, result) => {
      if (err) throw err;
    });
  })
  //////////////////////////////////// End of Contact/////////////////////


  //////////////////////////////About us //////////////////////////
  // Untuk menampilkan Aboutus
  app.get('/Aboutus', function (req, res) {

    var sql = 'SELECT * FROM aboutus';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result)
    });
  })

  // untuk update About us
  app.post('/Aboutus/update', function (req, res) {

    var how_it_all_began = req.body.how_it_all_began;
    var who_we_are = req.body.who_we_are;
    var we_care = req.body.we_care;
    var fast_delivery = req.body.fast_delivery;
    var your_security = req.body.your_security;
    var id = req.body.id

    var sql = 'UPDATE aboutus SET how_it_all_began=?,who_we_are=?, we_care=? ,fast_delivery=?,your_security=? WHERE id=?';

    db.query(sql, [how_it_all_began, who_we_are, we_care, fast_delivery, your_security, id], (err, result) => {
      if (err) throw err;
    });
  }
  )



  app.get('/invoice', function (req, res) {
    if (req.query.awal == 1) {
      var sql = 'SELECT * FROM invoice LIMIT 0,5';
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
      })
    }

    else if (req.query.page != undefined) {

      var LIMIT = req.query.page
      var sql = `SELECT * FROM invoice LIMIT ` + LIMIT + ",5";
      db.query(sql, LIMIT, (err, result2) => {
        if (err) throw err;
        res.send(result2)
      })
    }
    else {

      var sql = 'SELECT * FROM invoice';
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)

      });
    }
  })

  app.post('/invoice/update', function (req, res) {


    var color = req.body.color;
    var status = req.body.status;
    var id = req.body.id

    var sql = 'UPDATE invoice SET status=?,color=? WHERE id=?';

    db.query(sql, [status, color, id], (err, result) => {
      if (err) throw err;
    });
  })

  app.post('/order_ditel', function (req, res) {

    var invoice_number = req.body.invoice_number;
    var sql = 'SELECT * FROM invoice_detail WHERE invoiceid = ?';
    db.query(sql, invoice_number, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  })

  app.get('/product', function (req, res) {



    if (req.query.awal == 1) {
      var sql = 'SELECT * FROM `product` JOIN `category` ON product.category_id = category.id JOIN `condition` ON product.condition_id = condition.id JOIN `measure` ON product.Unit_measure_id = measure.id ORDER BY product.id_product DESC LIMIT 0,5';
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
      })
    }


    else if (req.query.page != undefined) {

      var LIMIT = req.query.page
      var sql = 'SELECT * FROM `product` JOIN `category` ON product.category_id = category.id JOIN `condition` ON product.condition_id = condition.id JOIN `measure` ON product.Unit_measure_id = measure.id ORDER BY product.id_product DESC LIMIT ' + LIMIT + ",5";
      db.query(sql, LIMIT, (err, result2) => {
        if (err) throw err;
        res.send(result2)
      })
    }
    else {

      var sql = 'SELECT * FROM `product` JOIN `category` ON product.category_id = category.id JOIN `condition` ON product.condition_id = condition.id JOIN `measure` ON product.Unit_measure_id = measure.id ORDER BY product.id_product DESC';
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)

      });
    }
  })

  app.get('/product/show_category',function(req,res){

    var sql = 'SELECT * FROM `category`';
    db.query(sql,(err, result) => {
      if (err) throw err;
      res.send(result)
    });

  })


    app.get('/product/measure',function(req,res){

      var sql = 'SELECT * FROM `measure`';
      db.query(sql,(err, result) => {
        if (err) throw err;
        res.send(result)
      });
  
    })


    app.get('/product/condition',function(req,res){

      var sql = 'SELECT * FROM `condition`';
      db.query(sql,(err, result) => {
        if (err) throw err;
        res.send(result)
      });
  
    })




  app.post('/product/addproduct', function (req, res) {

    var data = {
      nama_product: req.body.nama_product,
      price: req.body.price,
      quantity: req.body.quantity,
      category_id: req.body.category,
      condition_id: req.body.condition,
      description: req.body.description,
      Unit_measure_id: req.body.Unit_measure,
      useradmin_id: req.body.useradmin_id
    };
    var sql = 'INSERT INTO product SET ?';
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })

  app.post('/product/editproduct', function (req, res) {

    var id = req.body.id
    var sql = 'SELECT * FROM `product` where id_product= ?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      res.send(result)
    }); 
  })

  app.post('/product/editproduct/update', function (req, res) {


    
  var useradmin_id = req.body.useradmin_id;
  var nama_product = req.body.nama_product;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var category_id = req.body.category;
  var Unit_measure_id = req.body.Unit_measure;
  var condition_id = req.body.condition;
  var description = req.body.description;
  var id_product = req.body.id;
      
  var sql = 'UPDATE product SET `condition_id`=?,`description`=?,`nama_product`=?, `price`=?, `quantity`=?, `category_id`=?, `Unit_measure_id`=?,`useradmin_id`=? WHERE `id_product`=?'

    db.query(sql,[condition_id,description,nama_product,price,quantity,category_id,Unit_measure_id,useradmin_id,id_product],(err, result) => {
      if (err) throw err;
      res.send('Update berhasil');
      console.log(result)
    });

  })

  app.post('/product/addproduct_pcr', function (req, res) {

    var userfile = req.files.file

    var namafileuniq = uniqid();

    userfile.mv(__dirname + '/image/' + namafileuniq + '.' + userfile.mimetype.split('/')[1],

      function (err) {
        if (err)
          return res.status(500).send(err);
        res.send('File uploaded!');
      }
    );

    var data = {
      product_id: req.body.id,
      product_images: namafileuniq + '.' + userfile.mimetype.split('/')[1]
    };
    var sql = 'INSERT INTO product_image SET ?';
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })

  app.post('/product/delete', function (req, res) {

    var id = req.body.id
    var sql = 'DELETE from product WHERE id_product=?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })

  app.post('/product/img', function (req, res) {

    var id = req.body.id

    var sql = 'SELECT * FROM product_image where product_id= ?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      res.send(result)
    });

  })

  app.post('/product/img/delete', function (req, res) {
    var nama = req.body.product_images
    var id = req.body.id
    var sql = 'DELETE from product_image WHERE id=?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    var fs = require('fs');
    var filePath = __dirname + '/image/' + nama
    fs.unlinkSync(filePath);

  })

 
  app.post('/product/addcategory', function (req, res) {

    var data = {
      nama_category: req.body.nama_category
    };

    var sql = 'INSERT INTO category SET ?';
    db.query(sql, data, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })

  app.post('/product/category/delete', function (req, res) {

    
    var id= req.body.id
    var sql = 'DELETE FROM `category` WHERE id =?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  })

  app.post('/product/show_categorybyid', function (req, res) {

    var id = req.body.id    
    var sql = 'SELECT * FROM `category` WHERE id =?';
    db.query(sql, id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });

  })

   app.post('/product/category/edit', function (req, res) {


    var id = req.body.id;
    var nama_category = req.body.nama_category;

    var sql = 'UPDATE `category` SET `nama_category`=? WHERE id =?';
    db.query(sql, [nama_category,id], (err, result) => {
      if (err) throw err;
      console.log(result);
    });

  })



  app.listen(3001);

