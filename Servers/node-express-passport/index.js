require('dotenv').config();
const express = require('express');
const http = require('http');

require('./config/database/db.setup');
let app = express();
const server = http.createServer(app)
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const routes = require('./routes/routes');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname , 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: 'bonsai is art',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 5000
    })
}))

// PASSPORT COMES HERE
require('./config/passport/passport.setup')(app)

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))
app.use(routes)


server.listen(5000, () => {
    console.log("CONNECTED TO PORT 5000!")
})
