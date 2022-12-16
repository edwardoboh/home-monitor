const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
    deviceName: {
        type: String,
        required: false
    },
    deviceId: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false
    },
    // accelerometer: {
    //     type: String,
    //     required: false
    // },
    accX: {
        type: String,
        default: 0
    },
    accY: {
        type: String,
        default: 0
    },
    accZ: {
        type: String,
        default: 0
    },
    shock: {
        type: Boolean
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("devices", DeviceSchema)