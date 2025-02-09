import mongoose from 'mongoose'
import ProductsModel from '../models/productsModel.js'
import { upload } from '../storage/upload.js'
import { fileDelete } from '../storage/delete.js'

const deleteImage = (imageToDelete, res) => {
    if (imageToDelete) {
        try {
            fileDelete(imageToDelete)
        } catch (error) {
            return res.status(404).json({ error })
        }
    }
}

export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const category = req.query.category

    try {
        const query = category ? { category } : {}

        const totalProducts = await ProductsModel.countDocuments(query)

        const products = await ProductsModel.find(query)
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit)
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Product not found.' })
    }
    const product = await ProductsModel.findById(id)
    if (product) {
        res.status(200).json(product)
    } else {
        return res.status(404).json({ error: 'Product not found.' })
    }
}

export const createProduct = [
    upload.single('image'),
    async (req, res) => {
        const { title, category, description, price } = req.body
        const imagePath = req.file.filename

        let emptyFields = []
        if (!title) { emptyFields.push('title') }
        if (!category) { emptyFields.push('category') }
        if (!imagePath) { emptyFields.push('image') }
        if (!description) { emptyFields.push('description') }
        if (!price) { emptyFields.push('price') }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
        }

        try {
            const product = await ProductsModel.create({ title, category, imagePath, description, price })
            res.status(200).json(product)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
]

export const updateProduct = [
    upload.single('image'),
    async (req, res) => {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(404).json({ error: 'Product not found.' })
        }
        const { title, category, description, price } = req.body
        const imagePath = req.file ? req.file.filename : undefined

        let emptyFields = []
        if (!title) { emptyFields.push('title') }
        if (!category) { emptyFields.push('category') }
        if (!description) { emptyFields.push('description') }
        if (!price) { emptyFields.push('price') }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
        }

        const product = await ProductsModel.findOneAndUpdate({ _id: id }, { ...req.body, imagePath })
        if (imagePath) {
            deleteImage(product.imagePath)
        }
        if (product) {
            res.status(200).json(product)
        } else {
            return res.status(404).json({ error: 'Product not found.' })
        }
    }
]

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Product not found.' })
    }

    const product = await ProductsModel.findOneAndDelete({ _id: id })
    deleteImage(product.imagePath)
    if (product) {
        res.status(200).json(product)
    } else {
        return res.status(404).json({ error: 'Product not found.' })
    }
}
