import mongoose from "mongoose";

const contactsSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    phoneNumber: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
}, 
{ timestamps: true}
);

export const Contacts = mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);