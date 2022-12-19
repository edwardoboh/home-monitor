const express = require("express")
const route = express.Router()
const Hospital = require("../../model/Hospitals")

// GET      :[url]/hospital/
route.get("/", (req, res) => {
    let allHospitals = []
    Hospital.find((err, resp) => {
        if(err){
            console.log("Error getting all hospitals")
            return res.json({data:[], msg:"Error getting all Hospitals"})
        }
        resp.forEach(respHospital => {
            let properties = {
                id: respHospital._id,
                hospitalName: respHospital.hospitalName,
                address: respHospital.address,
                email: respHospital.email,
                phonePrimary: respHospital.phonePrimary,
                phoneSecondary: respHospital.phoneSecondary,
                numOfAmbulance: respHospital.numOfAmbulance
            }
            let geometry = {
                coordinates: [respHospital.latitude, respHospital.longitude]
            }
            allHospitals.push({properties, geometry})
        })
        res.json({data: allHospitals, msg: "Getting all Hospitals was successful"})
    })
})

// POST     :[url]/hospital/add
route.post("/add", (req, res) => {
    const {properties, geometry} = req.body
    const hospital = new Hospital({
            hospitalName: properties.hospitalName,
            address: properties.address,
            email: properties.email,
            latitude: geometry.coordinates[0],
            longitude: geometry.coordinates[1],
            phonePrimary: properties.phonePrimary,
            phoneSecondary: properties.phoneSecondary,
            numOfAmbulance: properties.numOfAmbulance,
    })
    hospital.save().then(resp => res.json({data: resp, msg: "Add was Successful"}))
    .catch(e => {
        console.log("Unable to add new hospital")
        res.json({data: "", msg: "Add Hospital Error in server"})
    })
})

// DELETE       :[url]/hospital/delete/{id}
route.delete("/delete/:id", (req, res) => {
    Hospital.deleteOne({_id: req.params.id}).then(resp => {
        res.json({data: resp, msg: "Delete was successful"})
    }).catch(e => {
        console.log("Delete Failed")
        res.json({data: "", msg: "Delete Failed in Server"})
    })
})
module.exports = route