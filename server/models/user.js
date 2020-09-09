const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: Date
});

// virtual field
userSchema.virtual('password')

    .set((password) => {
        // create temporary variable called _password
        this._password = password
        // generate a timestamp
        this.salt = uuidv1()
        // encryptPassword
        this.hashed_password = this.encryptPassword(password)
    })

    .get(() => {
        return this._password
    })

// methods
userSchema.methods = {
    encryptPassword: (password) => {
            if(!password) return "";
            try {
                return crypto.createHmac('sha256', this.salt)
                            .update(password)
                            .digest('hex');
            }
            catch{
                return "";
            }
    }
}

module.exports = mongoose.model("User", userSchema)