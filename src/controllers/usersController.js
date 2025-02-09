import mongoose from 'mongoose'
import UserModel from '../models/usersModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getUsers = async (req, res) => {
    const users = await UserModel.find()
    res.status(200).json(users)
}

export const getUser = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'User not found.' })
    }
    const user = await UserModel.findById(id)
    if (user) {
        res.status(200).json(user)
    } else {
        return res.status(404).json({ error: 'User not found.' })
    }
}

export const createUser = async (req, res) => {
    const { email, password, name, surname } = req.body
    try {
        const user = await UserModel.createNew(email, password, name, surname)
        res.status(200).json({ email: user.email, id: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        console.error('Error during login:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


export const updateUser = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'User not found.' })
    }
    const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body })
    if (user) {
        res.status(200).json(user)
    } else {
        return res.status(404).json({ error: 'User not found.' })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'User not found.' })
    }
    const user = await UserModel.findOneAndDelete({ _id: id })
    if (user) {
        res.status(200).json(user)
    } else {
        return res.status(404).json({ error: 'User not found.' })
    }
}