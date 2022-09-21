const mongoose = require('mongoose')
const autoIncrement = require("mongoose-auto-increment");


const Schema = mongoose.Schema

const registerSchema = new Schema({
    Employee_Id: { type: Number, required: true },
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Employeecode: { type: String, required: true },
    Reportingmanager: { type: String },
    Employeetype_Id: { type: Number, required: true },
    Email_Id: { type: String, required: true },
    AlternateEmail: { type: String },
    Role_Id: { type: Number, required: true },
    Designation_Id: { type: Number, required: true },
    ContactNo: { type: String, required: true },
    Isactive: { type: Boolean, required: true },
    Joiningdate: { type: Date, required: true },
    Enddate: { type: Date },
    password: { type: String, required: true }

}, { timestamps: true }, { _id: false })

autoIncrement.initialize(mongoose.connection);
registerSchema.plugin(autoIncrement.plugin, {
    model: "Register",
    field: "Employee_Id",
    startAt: 1,
    incrementBy: 1,
});
module.exports = mongoose.model('Register', registerSchema)