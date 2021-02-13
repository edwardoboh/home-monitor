const express = require("express")
const route = express.Router()
const Device = require("../../model/Devices")

let DeviceSocket = ""

module.exports = (io) => {

    io.on("connection", (Socket) => {
        console.log("Client is connected to the server")
        DeviceSocket = Socket
        Socket.on("disconnect", () => console.log("Client has disconnected from server"))

    })

    // GET      :[url]/sensor

    route.get("/", (req, res) => {
        Device.find((err, resp) => {
            if(err){
                return res.json({data: "", msg: "Error trying to get all Devices in server"})
            }
            res.json({data: resp, msg: "GET all Devices was Successful"})
        })
    })

    // GET      :[url]/sensor/{id}
    route.get("/:id", (req, res) => {
        Device.findById(req.params.id).then(resp => {
            res.json({data: resp, msg: "Device successfully found"})
        })
        .catch(e => {
            console.log("Unable to get single Device from server")
            res.json({data: "", msg: "Unable to get single Device from server"})
        })
    })

    // GET      :[url]/sensor/update/?[queryString]
    route.get("/update", (req, res) => {
        const {} = req.query
    })

    // POST     :[url]/sensor/update
    route.post("/update", (req, res) => {
        const {latitude, longitude, accX, accY, accZ} = request.body
        const accData = {
            accX,
            accY,
            accZ
        }
        const accelerometer = JSON.stringify(accData)
        
        if(DeviceSocket === ""){}
        else DeviceSocket.emit("update", {latitude, longitude, accelerometer})
        
        Device.find((err, resp) => {
            if(err){
                return res.json({data: "", msg: "Error in server: Couldn't get 1st Device"})
            }
            const id = resp[0]._id
        })
        
        // Perform Geolocation with GMap API to get address from LngLat values
        const address = "Not Set yet"
        Device.updateOne({_id: id}, {$set : {latitude, longitude, accelerometer}}, (err, resp2) => {
            if(err){
                return res.json({data: "", msg: "Error in server trying to update Device"})
            }
            // OPTIONAL: Send a response to the user if you'd like
        })
    })

    return route
}

// module.exports = route