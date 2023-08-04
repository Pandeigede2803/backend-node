const Sequelize = require('sequelize')
const sequelize = require('../util/database')
// 'products' itu nama dari tabel dari database mysql
const CartItems = sequelize.define('cartitems', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity : Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    cartId: Sequelize.INTEGER,
    productId: Sequelize.INTEGER,
    prod_name: Sequelize.STRING,
    color: Sequelize.STRING,
    price: Sequelize.INTEGER,
    
},
{
    // agar nama table bisa berbeda dengan di database
    freezeTableName: true,
    // tableName: ''untuk mencocokan nama
},
);

//EXPORT AGAR BISA DIGUNAKAN DI JS YANG LAIN
module.exports = CartItems;