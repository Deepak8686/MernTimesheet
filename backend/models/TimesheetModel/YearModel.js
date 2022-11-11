import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema

const yaerSchema = new Schema({
    Year_Id: { type: Number, required: true },
    year: { type: Number },
    month: { type: Number },
    date: { type: Number },
    Employee_Id: { type: Number, required: true },
    Status: { type: String, required: true }

}, { timestamps: true }, { _id: false })

autoIncrement.initialize(mongoose.connection);
yaerSchema.plugin(autoIncrement.plugin, {
    model: "Year",
    field: "Year_Id",
    startAt: 1,
    incrementBy: 1,
});

export default mongoose.model('Year', yaerSchema)