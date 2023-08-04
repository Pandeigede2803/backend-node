//MENAMpilkan isi CART, dengan user ID yang sedang login (2)
const Product = require('../models/products');
const User = require('../models/user');


exports.getCart = (req, res,next)=> {
    req.user.getCart().then(resultCart => {
        return  resultCart.getProducts ().then (
            cartProducts => {
                res.send(JSON.stringify(cartProducts));
            }
        ).catch(err => console.error(err));
    }).catch(err => console.error(err));
};


//MENAMBAHKAN CART ITEM BERDASARKAN PRODUCT_ID
exports.postAddCartItem = (req, res,next)=> {

    //dipost berdasarkan body dan form productId
    const prodId=req.body.productId
    //CARI DULU PRODUCT_ID NYA ADA ATAU TIDAK
    Product.findByPk(prodId).then(resultProd => {
        
        console.log(`PRODUCT_ID: ${resultProd.id} DITEMUKAN LOOHH`);
        //temukan cart dari user yang akan ditambahkan
        req.user.getCart().then(myCart => {
        myCart.addProduct(resultProd).then(addResult =>{
            //hasil berupa JSON/ARRAY
            res.send(JSON.stringify(addResult));
            console.log("'CART ITEM  BERTAMBAH CUK'");
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}).catch(err => console.error(err));
};

exports.postEditAddCartItem = (req, res,next)=> {
    //dipost berdasarkan body dan form productId
    const productId=req.body.productId
    //edit qty
    const qty = req.body.qty
    //edit price
    const price = req.body.price
    const prodname = req.body.prod_name
    const warna = req.body.color

    req.user.getCart().then( myCart => {
        myCart.getProducts({
            where: {id: productId}
        }).then(results => {
            const result = results[0];
            console.log(`product: ${result.id} ketemu LOHHHHHHHHHHHHH`);
            if(!result){
                console.log("PRODUCT DI CARTITEM GA KETEMU CUK")
                res.json({message:"PRODUCT DI CARTITEM GA KETEMU CUK"})
            }
            console.log(result)
            
            result.cartitems.quantity = qty
            result.cartitems.price = price
            result.cartitems.prod_name = prodname
            result.cartitems.color = warna
            

            result.cartitems.save().then(resSave=>{
            // res.send(JSON.stringify(resSave));
            res.json({message:"DATA BERHASIL DITAMBAH CUK MANTAP",data:resSave})
            console.log("CART ITEM BERHASIL DITAMBAH CUK");
            
        })   
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

    //CARI DULU PRODUCT_ID NYA ADA ATAU TIDAK
//     Product.findByPk(prodId).then(resultProd => {
        
//         console.log(`PRODUCT_ID: ${resultProd.id} DITEMUKAN LOOHH`);
//         //temukan cart dari user yang akan ditambahkan
//         req.user.getCart().then(myCart => {
//         myCart.addProduct(resultProd).then(addResult =>{
//             //hasil berupa JSON/ARRAY
//             res.send(JSON.stringify(addResult));
//             console.log("'CART ITEM  BERTAMBAH CUK'");
//         }).catch(err => console.log(err));
//     }).catch(err => console.log(err));
// }).catch(err => console.error(err));
// };




//DELETE CART ITEM

// exports.deleteCartItem = (req, res,next)=> {
//     //ambil product id body
//     const productId=req.body.productId
//     //panggil user cart dulu
//     req.user.getCart().then(myCart => {
//         myCart.addProduct(resultProd).then
//         return resultCart.getProducts ().then (cartProducts => {
//                 res.send(JSON.stringify(cartProducts));
//             }
//         ).catch(err => console.error(err));
//     }).catch(err => console.error(err));
// };

//MENGHAPUS CARTITEM YANG SUDAH ADA;

exports.deleteCartItem = (req,res,next)=> {

    //get data from body request
    const productId=req.body.productId
    //cek user yang sedang login
    req.user.getCart().then( myCart => {
        console.log("WAH USER DITEMUKAN CUK!!!");
        
        //check current cart containts cartitem with product id
        myCart.getProducts({
            where: {id: productId}
            
            
        }).then(results => {

            console.log(`PRODUCT ${productId} DITEMUKAN CUK!!!`);
            const result = results[0]
            
            if(!result){
                res.json({message:"PRODUCT TIDAK ADA"})
            };
            result.cartitems.destroy().then(resDelete=> {
                res.json({data:resDelete,message:"SUKSES DIHANCURKAN"})
            }).catch(err => console.log(err));
            
        
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};


//MENGHAPUS semua CARTITEM yg ada di CART YANG SUDAH ADA;
exports.deleteCart = (req,res,next)=> {

    //cek user yang sedang login
    req.user.getCart().then( resultCart => {
        console.log("WAH USER DITEMUKAN CUK!!!");

        resultCart.getProducts().then(resultsProd => {
        
        
        for(const prod of resultsProd) {
            prod.cartitems.destroy(); 
            console.log("SEMUA CART ITEM DI MUSNAHKAN")
        }; 
        res.json({message:"CART DIHAPUS"})
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};



