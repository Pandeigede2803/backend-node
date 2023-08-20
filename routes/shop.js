// const express = require('express');
// // const app = express();
// const router = express.Router();
// const productsController = require("../controllers.js/products")


// router.get('/',productsController.getProducts);

// router.get('/product/:id', productsController.getProducts);


// module.exports = router;

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const shopController = require('../controllers/shop')

router.get("/", productsController.getProducts)
router.get("/product/:id", productsController.getProducts);

router.get("/nyarik-cart", shopController.getCart);

router.post("/nyarik-cartitem", shopController.postAddCartItem);

router.post("/ngedit-cartitem", shopController.postEditAddCartItem);

router.delete("/musnahkan-cartitem", shopController.deleteCartItem);
router.get("/musnahkan-cart", shopController.deleteCart);

router.post("/create-order",shopController.createOrder);
router.get("/orders",shopController.getOrders);

router.post("/create-order-item",shopController.createOrderItem);

// router.get("/get-order-item",shopController.getOrdersWithOrderItems);

router.get("/get-order-withId",shopController.getOrdersByOrderId)



module.exports = router