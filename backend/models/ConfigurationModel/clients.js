import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const clientschema = mongoose.Schema({
    Client_Id: { type: Number, required: true },
    Client_Name: { type: String, required: true },
    IsActive: { type: Boolean, required: true }
});

autoIncrement.initialize(mongoose.connection);
clientschema.plugin(autoIncrement.plugin, {
    model: "Clientmodel",
    field: "Client_Id",
    startAt: 1,
    incrementBy: 1,
});
export default mongoose.model("Clientmodel", clientschema);