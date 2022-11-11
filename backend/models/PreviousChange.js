import mongoose from 'mongoose';

const Schema = mongoose.Schema

const previousChangeSchema = new Schema({
    Employee_Id: { type: Number },
    Firstname: { type: String },
    Lastname: { type: String },
    Employeecode: { type: String },
    Reportingmanager: { type: String },
    Employeetype_Id: { type: Number },
    Email_Id: { type: String },
    AlternateEmail: { type: String },
    Role_Id: { type: Number },
    Designation_Id: { type: Number },
    ContactNo: { type: String },
    Joiningdate: { type: Date },
    Enddate: { type: Date },

}, { timestamps: true })

export default mongoose.model('PreviousChange', previousChangeSchema)