//BACKEND SEQUILIZE 

const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const cors = require('cors')
const sequelize = require('./util/database')

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartitem");

console.log('start express node server....')

app.use(bodyparser.urlencoded({extended:false}))
app.use(cors())




// deklarasi USER
Product.belongsTo(User,{constaints : true, onDelete:"CASCADE"});
//user memiliki banyak product
User.hasMany(Product);
//user memiliki satu CART
User.hasOne(Cart);
//cart dimiliki satu cart
Cart.belongsTo(User);


//ketika cart bisa memiliki banyak product
// dan product bisa dimiliki oleh banyak cart

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

//menentukan Find the user = user id :2
//user id ter set otomatis di userId:2
//UNTUK MENETAPKAN USER ID SELALU DI USERID:2
app.use((req, res, next) => {
    // untuk semua halaman akan menampilkan console.log
    console.log("middle 1:", Date.now())
    User.findByPk(2).then(userFound => {
        req.user = userFound
        console.log("ketemu")
        // Cart.findByPk(1).then(cartFound=> {
        //     req.cart = cartFound
        // })
        next()
    }).catch(err => console.error(err));
});

// segala url yg berisi "/admin" akan memanggil admin Routes
app.use('/admin',adminRoutes);
// segala url yg berisi "/shop" akan memanggil admin Routes
app.use('/shop',shopRoutes);




router.use((req, res, next) => {
    // untuk semua halaman akan menampilkan console.log
    console.log("middle 1:", Date.now())
    next()
})


router.use("/user/:id", function(req, res, next){
    console.log("middle user", req.params.id)
    next()
})


router.get("/user/:id", function(req, res){
    res.send(req.method+"-"+req.params.id)
})

router.get("/print", function(req, res){
    res.send(req.method+"-"+req.query.text+"-"+req.query.name)
})

app.use("/", router);


app.use((req, res, next) => {
    res.status(404).send("<h1>Halaman Tidak Ditemukan</h1>")
})

const koneksi = async() => {
    try{
        await sequelize.authenticate()
        console.log('database terhubung')
    }catch(error){
        console.log('error koneksi database', error)
    }
}

// koneksi()
sequelize.sync().then(result => {
    
    return User.findByPk(2);
    // console.log(result)


//kalau userId: 2 tidak ada maka akan langsung dibuatkan dengan name dan email sbb
    
}).then(userFound =>{
    console.log("'USER DITEMUKAN CUK'")
    if(!userFound){
        return User.create({
            name:"Kancrut",
            email:"kancrut@gmail.com",
        })
    }
    return userFound

}).then(myuser => {
    app.listen(8000);
    // return Cart.findByPk(1).then( mycart => {
    //     console.log("KERANJANG TELAH DIBUAT CUK")
    //     if (!mycart) {
    //         return myuser.createCart()
    //     }
    //     return mycart;
    // }).catch(err => console.error(err))
    
    // return myuser.createCart()
    // app.listen(8000);
// }).then((cart) =>{
//     // app.list
    
}).catch(err => {
    console.log(err)
});