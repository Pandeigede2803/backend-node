const Sequelize = require('sequelize')
const sequelize = require('../util/database')
// 'products' itu nama dari tabel dari database mysql
const image = sequelize.define('images_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productId: Sequelize.INTEGER,
    url : {
        type: Sequelize.STRING,
        allowNull: false
    },
    width : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    height : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    filename : {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    
},
{
    // agar nama table bisa berbeda dengan di database
    freezeTableName: true,
    // tableName: ''untuk mencocokan nama
},
);

//EXPORT AGAR BISA DIGUNAKAN DI JS YANG LAIN
module.exports = image