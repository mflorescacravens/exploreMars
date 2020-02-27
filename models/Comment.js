const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    like: Boolean
})

// commentSchema.pre('save', function(next) {
//     if (comment === true) {
//         next()
//     }
// })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;