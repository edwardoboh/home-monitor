const mongoose = require("mongoose")

const Schema = mongoose.Schema

const HomeSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
    }
})

module.exports = mongoose.model("home", HomeSchema)