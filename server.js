const mongoose = require('mongoose');
const config = require('./config/database');
const app = require('./app');

require('dotenv').config({ path: '.env' });

// Connecting to MongoDB
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.once('error', err => {
    console.log('ERROR : ' + err);
});

//Connecting to server
app.listen(config.port, () => {
    console.log(`App is listening to ${process.env.PORT}`);
});
