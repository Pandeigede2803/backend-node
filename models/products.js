// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')
// // 'products' itu nama dari tabel dari database mysql
// const Product = sequelize.define('products', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price : {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description : {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     userId: Sequelize.INTEGER,
    
// },
// {
//     // agar nama table bisa berbeda dengan di database
//     freezeTableName: true,
//     // tableName: ''untuk mencocokan nama
// },
// );
// module.exports = Product

const Sequelize = require('sequelize')
const sequelize = require('../util/database')
// 'products' itu nama dari tabel dari database mysql
const Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price : {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: Sequelize.INTEGER,
    
},
{
    // agar nama table bisa berbeda dengan di database
    freezeTableName: true,
    // tableName: ''untuk mencocokan nama
},
);

//EXPORT AGAR BISA DIGUNAKAN DI JS YANG LAIN
module.exports = Product