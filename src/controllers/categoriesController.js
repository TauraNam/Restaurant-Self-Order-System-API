import mongoose from 'mongoose'
import CategoriesModel from '../models/categoriesModel.js'
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

export const getCategories = async (req, res) => {
    const categories = await CategoriesModel.find()
        .sort({ sortingOrder: 1 })
    res.status(200).json(categories)
}

export const getCategory = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Category not found.' })
    }
    const category = await CategoriesModel.findById(id)
    if (category) {
        res.status(200).json(category)
    } else {
        return res.status(404).json({ error: 'Category not found. ' })
    }
}

export const createCategory = [
    upload.single('image'),
    async (req, res) => {
        const { title, sortingOrder } = req.body
        const imagePath = req.file.filename

        let emptyFields = []
        if (!title) { emptyFields.push('title') }
        if (!sortingOrder) { emptyFields.push('sortingOrder') }
        if (!imagePath) { emptyFields.push('imagePath') }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
        }

        try {
            const category = await CategoriesModel.create({ title, sortingOrder, imagePath })
            res.status(200).json(category)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
]

export const updateCategory = [
    upload.single('image'),
    async (req, res) => {
        const { id } = req.params
        if (mongoose.Types.ObjectId.isValid(id) === false) {
            return res.status(404).json({ error: 'Category not found.' })
        }

        const { title, sortingOrder } = req.body
        const imagePath = req.file ? req.file.filename : undefined

        let emptyFields = []
        if (!title) { emptyFields.push('title') }
        if (!sortingOrder) { emptyFields.push('category') }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields.', emptyFields })
        }

        const category = await CategoriesModel.findOneAndUpdate({ _id: id }, { ...req.body, imagePath })
        if (imagePath) {
            deleteImage(category.imagePath)
        }
        if (category) {
            res.status(200).json(category)
        } else {
            return res.status(404).json({
                error: 'Category not found.'
            })
        }
    }
]

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(404).json({ error: 'Category not found.' })
    }
    const category = await CategoriesModel.findOneAndDelete({ _id: id })
    deleteImage(category.imagePath)
    if (category) {
        res.status(200).json(category)
    } else {
        return res.status(404).json({ error: 'Category not found.' })
    }
}