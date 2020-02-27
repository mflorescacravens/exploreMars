// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const expressJWT = require('express-jwt');
// const helmet = require('helmet');
// const RateLimit = require('express-rate-limit');
// const user = require('./models/User');
// const Comment = require('./models/Comment')

// // const models = require('./models')
// const app = express();

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());
// app.use(helmet());

// const loginLimiter = new RateLimit({
//     windowMs: 5*60*1000,
//     max: 3,
//     delayMs: 0,
//     message: 'Maximum login attempts exceeded'
// });
// const signupLimiter = new RateLimit({
//     windowMs: 60*60*1000,
//     max: 3,
//     delayMs: 0,
//     message: "Maximum accounts created. Try again later."
// });

// mongoose.connect('mongodb://localhost/rover-mars', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.once('open', () => {
//     console.log(`🦁🦁🦁Conected to Mongo on ${db.host}:${db.port}`);
// });
// db.on('error', (err) => {
//     console.log(`❌❌❌Database error:\n${err}`)
// });



// // //! GET all comments
// app.get('/comments', (req, res) => {
//     Comment.find({}, function(err, comment) {
//         if(err) res.json(err)
//         res.json(comment)
//     })
// })

// // //! GET One comment
// app.get('/comments/:id', (req, res) => {
//     Comment.findById(req.params.id, function(err, comment) {
//         if(err) res.json(err)
//         res.json(comment)
//     })
// })

// //! POST a comment

// app.post('/comments', (req,res) => {
//     Comment.create({
//         comment: req.body.comment,
//         like: req.body.like
//     }, function(err, comment) {
//         res.json(comment)
//     })
// })

// // //! POST One User comment

// app.get("/comments/:id", (req, res) => {
//     User.findById(req.params.id, function(err, user) {
//         commentSchema.findById(req.body.id, function(err, comment) {
//             user.comments.push(comment);
//             user.save( function(err) {
//                 comment.user.push(user);
//                 comment.save( function(err) {
//                     if (err) res.json(err)
//                     res.json(user)
//                 })
//             })
//         })
//     })
// })

// //! UPDATE a comment

// app.put('/comments/:id', (req, res) => {
//     Comment.findByIdAndUpdate(req.params.id, {
//         comment: req.body.comment,
//         like: req.body.like
//     }, function(err, comment) {
//         if (err) res.json(err)
//         res.json(comment)
//     })
// })

// //! DELETE a comment

// app.delete('/comments/:id', (req, res) => {
//     Comment.findByIdAndDelete(req.params.id, function(err, comment) {
//         if (err) res.json(err)
//         res.json(comment)
//     })
// })

// // app.get('*', function(req, res) {
// //     res.sendFile(__dirname + '/client/build/index.html');
// // })

// // app.use('/auth/login', loginLimiter);
// // app.use('/auth/signup', signupLimiter);

// app.use('/auth', require('./routes/auth'));
// app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));
// app.get('/parent/son', function(req, res) {
//     res.send('i am groot');
// });

// app.listen(process.env.PORT, () => {
//     console.log(`🍕🍕🍕you're listening to port ${process.env.PORT}...`)
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
    windowMs: 5*60*1000,
    max: 3,
    delayMs: 0,
    message: 'Maximum login attempts exceeded'
});
const signupLimiter = new RateLimit({
    windowMs: 60*60*1000,
    max: 3,
    delayMs: 0,
    message: "Maximum accounts created. Try again later."
});

mongoose.connect('mongodb://localhost/jwtAuth', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`Conected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
    console.log(`Database error:\n${err}`)
});

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));
app.get('/parent/son', function(req, res) {
    res.send('i am groot');
});

app.listen(process.env.PORT, () => {
    console.log(`you're listening to port ${process.env.PORT}...`)
});