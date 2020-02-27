const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must enter a name'],
        minlength: [1, 'Nmae must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be betwee 1 and 99 characters']
    },
    password: {
        type: String,
        required: [true, 'You must enter a password'],
        minlength: [8, 'Password must be between 8 and 128 characters'],
        maxlength: [128, 'Password must be between 8 and 128 characters']
    },
    email: {
        type: String,
        required: [true, 'You must enter a password'],
        minlength: [5, 'Email must be between 5 and 99 characters'],
        maxlength: [99, 'Email must be between 5 and 99 characters']
    }
})

userSchema.set('toObject', {
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name
        }
        return returnJson
    }
})

userSchema.pre('save', function(next) {
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash;
    }
    next();
})

userSchema.methods.authenticated = function(password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);