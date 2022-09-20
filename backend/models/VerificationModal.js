const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VerifySchema = new Schema({
    id: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiredAt: {
        type: Date,
        index: { expires: '2m' },
    }
}, { timestamps: false })

module.exports = mongoose.model('Verification', VerifySchema)