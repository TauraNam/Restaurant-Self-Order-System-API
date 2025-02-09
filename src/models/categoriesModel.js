import mongoose from 'mongoose'

const Schema = mongoose.Schema
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    sortingOrder: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 99
    },
    imagePath: {
        type: String,
        required: true
    }
})

export default mongoose.model('Category', categorySchema)