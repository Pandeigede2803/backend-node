// const express = require ('express');
// const router = express.Router();
// const productsController = require("../controllers.js/products")



// router.post('/products',(req, res,next)=>{
//     console.log(req.body);
//     res.redirect("/admin")
// }
// );
// router.post("/add-products", productsController.postAddProduct);


// module.exports = router;

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products')

// artinya /admin/product
router.use('/products', (req, res, next) => {
    console.log(req.body)
    res.redirect('/shop')
})

//ADMIN AMBIL PRODUCT
router.get('/ambil-product', (req, res, next) => {

    console.log(req.body)
    res.redirect('/shop')
})

// /admin/add-products
router.post("/add-products", productsController.postAddProduct);
//admin/edit-products
router.post("/edit-product", productsController.postEditProduct);
//admin/edit-products
router.get("/edit-product/:id", productsController.getEditProducts);


//menampilkan dua data table sekaligus DARI SEBUAH USER ID
// USER ID 2 AKAN MENAMPILKAN DATABASE DARI PRODUCTS
router.get("/nyarik-user-product/:id", productsController.getUserProducts);

//admin/delete-products
router.delete("/delete-product", productsController.postDeleteProduct);



module.exports = router;