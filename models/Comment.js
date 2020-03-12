const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: Object,
    comment: String,
    date: {
        type: String
    }
})

// commentSchema.pre('save', function(next) {
//     if (comment === true) {
//         next()
//     }
// })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;