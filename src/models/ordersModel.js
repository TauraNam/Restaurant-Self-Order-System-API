import mongoose from 'mongoose'
import mongooseSequence from 'mongoose-sequence'

const Schema = mongoose.Schema
const autoIncrement = mongooseSequence(mongoose)

const orderSchema = new Schema({
    orderId: {
        type: Number,
        unique: true
    },
    tableNumber: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    notes: {
        type: String,
        maxlength: 250,
    },
    orderPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Declined", "In-process", "Completed"],
        required: true
    }
}, { timestamps: true })

orderSchema.plugin(autoIncrement, { inc_field: 'orderId' })

export default mongoose.model('Order', orderSchema)