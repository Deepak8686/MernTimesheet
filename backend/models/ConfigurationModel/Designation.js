const mongoose = require('mongoose')
const autoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema

const designationSchema = new Schema({
    Designation_Id: {
        type: Number,
        reuired: true
    },
    Designation_Name: {
        type: String,
        required: true
    },
    Isactive: {
        type: Boolean
    }
}, { timestamps: true }, { _id: false },)

autoIncrement.initialize(mongoose.connection);
registerSchema.plugin(autoIncrement.plugin, {
    model: "Designation",
    field: "Designation_Id",
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model('Designation', designationSchema)