import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        required: true
    }
}, { timestamps: true })

userSchema.statics.createNew = async function (email, password, name, surname) {
    if ( !email || !password || !name || !surname ) {
        throw new Error('All fields are required.')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error('This email has already been used.')
    }

    if (validator.isEmail(email) === false) { throw new Error('Email is not valid.') }
    if (validator.isStrongPassword(password) === false) { throw new Error('Password is too weak.') }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, name, surname })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required.')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect username or password.')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect username or password.')
    }
    return user
}

export default mongoose.model('User', userSchema)