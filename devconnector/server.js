const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); 

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');


const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = 'mongodb+srv://Omar:123@cluster0.97vae.mongodb.net/devconnector?retryWrites=true&w=majority';//require("/config/keys").mongoURI;

//connect to mongo db
mongoose.connect(db).then(()=> console.log('mongoDB connected')).catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log('Server running on port '+(port)));