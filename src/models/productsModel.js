import mongoose from 'mongoose'

const Schema = mongoose.Schema
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

export default mongoose.model('Products', productSchema)