const Sequelize = require('sequelize');



const sequelize = new Sequelize ('ecommerce','root','1234',
{
    host: "localhost",
    dialect: "mysql",
    // port: 3306,
    
    
}

)

module.exports = sequelize