const mongoose = require('mongoose')
const bcrpt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static sign up methods
userSchema.statics.signup = async function (email, password) {
    // Validation
    if (!email || !password) throw Error('All fields must be filled.')

    if (!validator.isEmail(email)) throw Error('Email is not valid.')

    if (!validator.isStrongPassword(password)) throw Error('Password not strong enough.')

    const userExists = await this.findOne({ email })

    if (userExists) {
        throw Error('Email already in use.')
    }

    const salt = await bcrpt.genSalt(10)
    const hashedPassword = await bcrpt.hash(password, salt)

    const user = this.create({ email, password: hashedPassword})

    return user
}


module.exports = mongoose.model('User', userSchema)