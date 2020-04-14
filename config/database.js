//databse and port configurations
<<<<<<< HEAD
=======

>>>>>>> 4480d3650b06b1d30a109a1a3515a50ad9eb351b
require('dotenv').config({ path: 'variables.env' });

module.exports = {
    database: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0-i7eo5.mongodb.net/test?retryWrites=true&w=majority`,
    port: process.env.PORT,
    secret: process.env.SECRET,
}