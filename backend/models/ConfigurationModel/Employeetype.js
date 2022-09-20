const mongoose = require('mongoose')
const autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema

const employeetypeSchema = new Schema({
    Employeetype_Id: {
        type: Number,
        required: true
    },
    Employeetype_Name: {
        type: String,
        required: true
    },
    Isactive: {
        type: Boolean,
    }
}, { timestamps: true }, { _id: false })

autoIncrement.initialize(mongoose.connection);
registerSchema.plugin(autoIncrement.plugin, {
    model: "Employeetype",
    field: "Employeetype_Id",
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model('Employeetype', employeetypeSchema)