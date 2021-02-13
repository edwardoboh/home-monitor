const mongoose = require("mongoose")

const Schema = mongoose.Schema

const HospitalSchema = new Schema({
    hospitalName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    phonePrimary: {
        type: String,
        required: true
    },
    phoneSecondary: {
        type: String,
        required: false
    },
    numOfAmbulance: {
        type: Number,
        required: true
    }
})

// module.exports = HospitalSchemaModel = mongoose.model("autoCrash", HospitalSchema)
module.exports = mongoose.model("hospitals", HospitalSchema)