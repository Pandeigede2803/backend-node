const Sequelize = require('sequelize')
const sequelize = require('../util/database')
// 'products' itu nama dari tabel dari database mysql
const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    userId: Sequelize.INTEGER,
    
},
{
    // agar nama table bisa berbeda dengan di database
    freezeTableName: true,
    // tableName: ''untuk mencocokan nama
},
);

//EXPORT AGAR BISA DIGUNAKAN DI JS YANG LAIN
module.exports = Orders;