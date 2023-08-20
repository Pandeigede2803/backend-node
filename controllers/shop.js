//MENAMpilkan isi CART, dengan user ID yang sedang login (2)
const Product = require('../models/products');
const User = require('../models/user');
const Orders= require('../models/orders');
const OrderItems= require('../models/ordersitems')


// exports.getCart = (req, res,next)=> {
//     req.user.getCart().then(resultCart => {
//         return  resultCart.getProducts ().then (
//             cartProducts => {
//                 res.send(JSON.stringify(cartProducts));
//             }
//         ).catch(err => console.error(err));
//     }).catch(err => console.error(err));
// };

exports.getCart = (req, res, next) => {
    req.user.getCart()
      .then(resultCart => {
        return resultCart.getProducts()
          .then(cartProducts => {
            res.json(cartProducts); // Send the response as JSON
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
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



//ORDERS

//POST ORDER

exports.createOrder = (req, res) => {
    const { userId, /* other order details */ } = req.body;
  
    // Check if the userId exists in the User model
    User.findByPk(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: `User with ID: ${userId} not found` });
        }
  
        // User exists, proceed to create the order
        Orders.create({ userId, /* other order details */ })
          .then(order => {
            res.status(201).json({ message: `Order created successfully by userID:${userId} `, order });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Order creation failed' });
          });
      }).catch(err => console.log(err));
  };

  //GET ORDERS

  // Controller function to get all orders for a specific user
exports.getOrders = (req, res) => {
    const { userId } = req.body; // Assuming you pass userId as a route parameter
  
    // Find all orders for the specified userId
    Orders.findAll({ where: { userId } })
      .then(orders => {
        if (!orders || orders.length === 0) {
          return res.status(404).json({ message: 'No orders found for this user' });
        }
  
        // Send the list of orders as a response
        res.status(200).json({ message: `Orders dari si userID: ${userId} diteukan cuk`, orders });
      })
      .catch(err => console.log(err));
  };


  //post orderitems

  // Controller function to handle creating a new OrderItem
exports.createOrderItem = (req, res) => {
    const { orderId, productId } = req.body;
  
    // Check if the orderId and productId exist and are valid
    Promise.all([
      Orders.findByPk(orderId),
      Product.findByPk(productId)
    ])
      .then(([order, product]) => {
        if (!order || !product) {
          return res.status(404).json({ message: 'Order or product not found' });
        }
  
        // Create the OrderItem in the database
        return OrderItems.create({ orderId, productId });
      })
      .then(orderItem => {
        res.status(201).json({ message: `OrderItem with orderId: ${orderId} and productId: ${productId}created successfully`, orderItem });
      }).catch(err => console.log(err));
  };



// Controller function to get orders with order items and product IDs
// exports.getOrdersWithOrderItems = (req, res) => {
//     const { userId } = req.body;
  
//     // Use Sequelize associations to fetch orders with order items and product IDs
//     Orders.findAll({
//       where: { userId }, // Filter orders by userId
//       include: [
//         {
//           model: OrderItems, // Include the OrderItem model
//           include: {
//             model: Product, // Include the Product model
//             attributes: ['id'] // Select only the 'id' attribute of Product
//           }
//         }
//       ]
//     })
//       .then(orders => {
//         if (!orders || orders.length === 0) {
//           return res.status(404).json({ message: 'No orders found for this user' });
//         }
  
//         // Send the list of orders with order items and product IDs as a response
//         res.status(200).json({ message: 'Orders found', orders });
//       })
//       .catch(err => console.log(err));
//   };


  exports.getOrdersByOrderId = (req, res, next) => {
    const { orderId } = req.body; // Assuming you pass the orderId as a route parameter
  
    Orders.findAll({
      where: { id: orderId }, // Filter orders by orderId
      include: [
        {
          model: OrderItems,
          include: [{model: Product, as:'product'}]
          // include: [{ model: ImageProduct , as: 'images' }]
        }
      ]
    })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        console.error("Error retrieving orders1:", err);
        res.status(500).json({ error: "Error retrieving orders" });
      });
  };