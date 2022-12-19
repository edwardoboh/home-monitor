const express = require("express")
const route = express.Router()
const Device = require("../../model/Devices")

// GET      :[url]/device
route.get("/", (req, res) => {
    Device.find({$sort: {_id: -1}}).then(resp => {
        // Reformat the data before sending it to the client
        // let Devices = []
        // resp.forEach(devResp => {
        //     let properties = {
        //         id: devResp._id,
        //         deviceName: devResp.deviceName,
        //         deviceId: devResp.deviceId,
        //         lastUpdate: devResp.lastUpdate,
        //         address: devResp.address,
        //         accelerometer: devResp.accelerometer,
        //         shock: false
        //     }
        //     let geometry = {
        //         coordinates: [devResp.latitude, devResp.longitude]
        //     }
        //     Devices.push({properties, geometry})
        // })
        // res.json({data: Devices, msg: "GET all Device Successful"})
        res.json({data: [resp[0]], msg: "GET all Device Successful"})
    })
    .catch(e => {
        console.log("Unable to get all Devices")
        res.json({data: "", msg: "Error in Getting all Device from Server"})
    })
})

// GET      :[url]/device/{id}
route.get("/:id", (req, res) => {
    Device.findById(req.params.id).then(resp => {
        res.json({data: resp, msg: "Device successfully found"})
    })
    .catch(e => {
        console.log("Unable to get single Device from server")
        res.json({data: "", msg: "Unable to get single Device from server"})
    })
})

// POST     :[url]/device/add
route.post("/add", (req, res) => {
    // const {properties, geometry} = req.body
    // const {accX, accY, accZ} = properties
    // const device = new Device({
    //     deviceName: properties.deviceName,
    //     deviceId: properties.deviceId,
    //     address: properties.address,
    //     longitude: geometry.coordinates[1],
    //     latitude: geometry.coordinates[0],
    //     accelerometer: JSON.stringify({accX, accY, accZ}),
    //     shock: false
    // })
    const {deviceId, deviceName, address, longitude, latitude, accX, accY, accZ} = req.body
    const device = new Device({
            deviceName,
            deviceId,
            address,
            longitude,
            latitude,
            accX,
            accY,
            accZ,
            shock: false
        })


    device.save((err, resp) => {
        if(err){
            console.log({error: err.message})
            return res.json({data: "", msg: "Error Adding a Device in Server"})
        }
        res.json({data: resp, msg: "Device successfully Added"})
    })
})

// DELETE       :[url]/device/delete/{id}
route.delete("/delete/:id", (req, res) => {
    Device.deleteOne({_id: req.params.id}).then(resp => {
        res.json({data: resp, msg: "Device Successfully Deleted"})
    })
    .catch(e => {
        console.log("Unable to delete Device from server")
        res.json({data: "", msg: "Unable to delete Device from server"})
    })
})

module.exports = route