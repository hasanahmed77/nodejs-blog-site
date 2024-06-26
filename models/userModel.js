const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

// Static sign up method
userSchema.statics.signup = async function (email, password) {
    // Validation
    if (!email || !password) throw Error('All fields must be filled.')

    if (!validator.isEmail(email)) throw Error('Email is not valid.')

    if (!validator.isStrongPassword(password)) throw Error('Password not strong enough.')

    const userExists = await this.findOne({ email })

    if (userExists) {
        throw Error('Email already in use.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({ email, password: hashedPassword})

    return user
}

// Static log in method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) throw Error('All fields must be filled.')

    const user = await this.findOne({ email })

    if (!user) throw Error('Incorrect email.')

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw Error('Incorrect password.')

    return user
}


module.exports = mongoose.model('User', userSchema)