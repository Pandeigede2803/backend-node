// // const products = []

// // exports.postAddProduct = (req,res,next) => {
// //     products.push({"title": req.title,"price": req.price})
// //     res.redirect("/shop")
// // }

    

// const products = []

// exports.postAddProduct = (req, res, next) => {

//     const title = req.body.title;
//     const imageUrl= req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
    

//     Product.create({
//         title: title,
//         price: price,
//         imageUrl: imageUrl,
//         description: description,
//         userId : req.body.userId,
//     }).then (result => {
//         console.log(result.toJSON());
//         console.log("product added")
//     }).catch(err => console.error(err));


//     // products.push({"title": req.body.nama,"price": req.body.price})

//     res.redirect("/shop")
// }

// exports.getIndex = (req, res, next) => {
//     Product.findAll()
//     .then(products => {
//         res.json({data:products, total:products.length})
//     }).catch (err => {
//         console.log(err)
//     });
// };

// exports.getProducts = (req, res, next) => {
//     const prod_id = req.params.id

//     Product.findById(prod_id).then (result =>{
//         res.json ({data: result, total:result.length})
//     }).catch (err => {
//         console.log(err)
//     })

//     Product.findAll().then(products => {
//         res.json({data:products, total:products.length})
//     }).catch (err => {
//         console.log(err)
//     });
    
// };

const { Op } = require('sequelize');
const Product = require('../models/products')
const products = [];
const User = require('../models/user');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;


    req.user.createProduct({
        title: title,
        price: parseFloat(price),
        imageUrl: imageUrl,
        description: description,
    
        // userId: req.body.userId
    }).then(result => {
        console.log(result.toJSON());
        console.log("product sukses di tambah")
        res.send(result.toJSON())
    }).catch(err => {
        console.log(err)
    })

    //res.redirect("/shop")
}

//MENAMBAHKAN DATA
exports.getProducts = (req, res, next) => {
const query = req.query

if(!query) {
    Product.findAll().then(result => {
        res.json({data: result, total: result.length})
    }).catch(err => {
        console.log(err)
    })
}else{
    Product.findAll({
        where: {
            title: {[Op.like] : `%${query.title}%`},
            price: query.price
        }
    }).then(result => {
        res.json({data: result, total: result.length})
    }).catch(err => {
        console.log(err)
    })
}

    };

// exports.getProduct = (req, res, next) => {
    //     const prod_id = req.params.id

    //     Product.findByPk(prod_id).then(result => {
    //         res.json({data: result, total: result.length})
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     }

exports.getProduct = (req, res, next) => {
        const prod_id = req.params.id

        Product.findByPk(prod_id).then(result => {
            res.json({data: result, total: result.length})
        }).catch(err => {
            console.log(err)
        })
        // req.user.getProducts({
        //     where: {id: prod_id}
        // }).then (result => {
        //     const result = result [0]
        //     if(!result) {
        //         return res.redirect("/")
        //     }
        //     res.send(JSON.stringify(result))
        // })
    };


//USER BISA MENGEDIT FORM DATABASE
exports.getEditProducts =(req, res,next)=>{
    const prod_id = req.params.id

        // Product.findByPk(prod_id).then(result => {
        //     res.json({data: result, total: result.length})
        // }).catch(err => {
        //     console.log(err)
        // })

        //USER AKAN MENDAPATKAN PRODUCT YANG DIBATASI DENGAN USERID PRODUCT
        req.user.getProducts({
            where: {id: prod_id}
        }).then (results => {
            const result = results[0]
            if(!result) {
                return res.redirect("/shop")
            }
            res.send(JSON.stringify(result))
        })
    
    
};

//MENAMPILKAN DUA DATA DARI SEBUAH USER.ID
//JADI KITA AKAN MENAMPILKAN SEBUAH DATABASE PRODUCT (PRODUCT )

//{"id":2,"name":"Kancrut",
//"email":"kancrut@gmail.com","createdAt":"2023-07-21T12:50:13.000Z",
//"updatedAt":"2023-07-21T12:50:13.000Z","products":
//[{"id":33,"title":"kaos2","price":5000,"imageUrl":"https://www.kodingakademi.id/members/","description":"kaos
// 1 dua
// tiga",

exports.getUserProducts = (req,res,next) => {
    const userid= req.params.id
    User.findAll({

        attributes: ['name','email'],
        //menentukan user id
        where: {id : userid},
        //beserta database lain
        include : [
            {model : Product,
                //UNTUK MENAMPILKAN DATA YANG DIKHUSUSKAN
            attributes: ["title","price"]
            }
        ]
    }).then (result =>{
        res.send(JSON.stringify(result))
    }).catch(err => console.log(err))
};

//MENGEDIT DATA YANG SUDAH ADA
exports.postEditProduct = (req, res, next) => {
    //TENTUKAN POSISI FORM DENGAN INI MEMAKAI BODY.ID
    //POSISI FORM DI "BODY DI HTML"
    const prodId = req.body.id;
    const updateTitle = req.body.title;
    const updateImageUrl = req.body.imageUrl
    const updateDeskripsi = req.body.description
    const updatePrice = req.body.price;


    //BUATKAN VARIABLE UNTUK MENENTUKAN RESULT
    Product.findByPk(prodId).then(resultProd => {
        resultProd.title = updateTitle;
        resultProd.description = updateDeskripsi;
        resultProd.price = updatePrice;
        resultProd.imageUrl = updateImageUrl;
        

        return resultProd.save();

    }).then(resultSave => {
        console.log("product have been edited");
        res.json(resultSave);
    }).catch(err => console.error(err));
}
//MENGHAPUS PRODUCT YANG SUDAH ADA;

exports.postDeleteProduct = (req,res,next)=> {
    const prodId = req.body.id

    Product.findByPk(prodId).then(resultProd => {
        return resultProd.destroy()
    }).then(resultDel => {
        console.log("product have been deleted");
        res.json(resultDel);

    }).catch(err => console.error(err));
};

//USER MENAMBAHKAN PRDUCT
