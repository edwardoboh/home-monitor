const express = require("express")
const route = express.Router()
const Device = require("../../model/Devices")
const Hospitals = require("../../model/Hospitals")
const distance = require("google-distance-matrix")
const nodeGeocoder = require("node-geocoder")
const api_key = "AIzaSyC2gvpIAVI9BzKmiPR4rwmLHv68Q91P0bE"
let option = {
    provider: 'google',
    // Optional depending on the providers
    // fetch: customFetchImplementation,
    apiKey: api_key, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
}
const geocoder = nodeGeocoder(option)

let DeviceSocket = ""

// module.exports = (io) => {
module.exports = (io) => {

    io.on("connection", (Socket) => {
        console.log("Client is connected to the server")
        DeviceSocket = Socket
        Socket.on("disconnect", () => console.log("Client has disconnected from server"))

    })

    // Function to calculate disatance matrix
    distance.key(api_key)
    // distance.units("imperial")

    /**************************************DISTANCE CALCULATION BEGIN********************************************/
    /*
    function calculateMatrix(){
        Device.find((err, resp) => {
            if(err){
                return res.json({data: "", msg: "Error in server: Couldn't get 1st Device"})
            }
            latitude = resp[0].latitude
            longitude = resp[0].longitude
            originLoc = [`${latitude},${longitude}`]
            Hospitals.find((err2, resp2) => {
                if(err2){
                    return res.json({data: "", msg: "Error in server: Couldn't get Hospitals"})
                }
                destinationLoc = resp2.map(hospital => {
                    return `${hospital.latitude},${hospital.longitude}`
                })
                distance.matrix(originLoc, destinationLoc, (err, resp3) => {
                    // console.log("All Distances: ", resp3.rows[0].elements)
                    let distanceData = resp3.rows[0].elements
                    let allHospitalDistanceData = distanceData.map((data, index) => {
                        return {hospital: resp2[index], distance: data}
                    })
                    console.log(allHospitalDistanceData)
                    return allHospitalDistanceData
                })
            })
        })
    }
    */
    /**************************************DISTANCE CALCULATION END********************************************/
    


    // *********************************************TEST ROUTES BEGIN*********************************

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
    // route.get("/:id", (req, res) => {
    //     Device.findById(req.params.id).then(resp => {
    //         res.json({data: resp, msg: "Device successfully found"})
    //     })
    //     .catch(e => {
    //         console.log("Unable to get single Device from server")
    //         res.json({data: "", msg: "Unable to get single Device from server"})
    //     })
    // })

    // *********************************************TEST ROUTES END*********************************

    // Using GET REQUEST FOR UPDATES
    // GET     :[url]/sensor/update
    route.get("/update", async (req, res) => {
        let id;
        let {latitude, longitude, accX, accY, accZ, shock} = req.query
        // const accData = {
        //     accX,
        //     accY,
        //     accZ
        // }
        // const accelerometer = JSON.stringify(accData)
        // console.log("Type of Shock Before: ", shock)
        // shock = Boolean(shock)
        if(shock.toLowerCase() === "true"){
            shock = true
        }else{
            shock = false
        }
        // console.log("Type of Shock After: ", shock)
        
        // Emitting Event to the Client
        if(DeviceSocket === ""){}
        else{
            // Remember to add address to the emitted message
            DeviceSocket.emit("update", {latitude, longitude, accX, accY, accZ, shock})
            DeviceSocket.emit("updateAgain")
            console.log("Server: Emmited data from server")
        }

        // DeviceSocket.emit("update")
        Device.find(async (err, resp) => {
            if(err){
                return res.json({data: "", msg: "Error in server: Couldn't get 1st Device"})
            }
            id = resp[0]._id
        
            // Perform Geolocation with GMap API to get address from LngLat values
           
            const address = await geocoder.reverse({lat: latitude, lon: longitude})
            // console.log(address[0].formattedAddress)
            

            Device.updateOne({_id: id}, {$set: {address: address[0].formattedAddress,latitude, longitude, accX, accY, accZ, shock, lastUpdate: Date.now()}}, (err, resp2) => {
                if(err){
                    return res.json({data: "", msg: "Error in server trying to update Device"})
                }


            /******************************************DISTANCE MATRIX BEGIN*********************************************/
            
                // let nlatitude = resp[0].latitude
                // let nlongitude = resp[0].longitude
                // let originLoc = [`${nlatitude},${nlongitude}`]
                let nlatitude = latitude
                let nlongitude = longitude
                let originLoc = [`${nlatitude},${nlongitude}`]
                Hospitals.find((err2b, resp2b) => {
                    if(err2b){
                        return res.json({data: "", msg: "Error in server: Couldn't get Hospitals"})
                    }
                    destinationLoc = resp2b.map(hospital => `${hospital.latitude},${hospital.longitude}`)
                    distance.matrix(originLoc, destinationLoc, (err, resp3) => {
                        let distanceData = resp3.rows[0].elements
                        let allHospitalDistanceData = distanceData.map((data, index) => ({hospital: resp2b[index], distance: data}))
                        // return allHospitalDistanceData
                        DeviceSocket.emit("matrix", allHospitalDistanceData)
                    })
                })
            
            /*******************************************DISTANCE MATRIX END********************************************/

                // OPTIONAL: Send a response to the user if you'd like
                return res.json({data: resp2})
            })
        })
        // res.end("Update Successful")
    })




    // USING POST REQUESTS FOR UPDATE
    // POST     :[url]/sensor/update
    /*
    route.post("/update", (req, res) => {
        let id;
        const {latitude, longitude, accX, accY, accZ} = req.body
        const accData = {
            accX,
            accY,
            accZ
        }
        const accelerometer = JSON.stringify(accData)
        
        // Emitting Event to the Client
        if(DeviceSocket === ""){}
        else{
            // Remember to add address to the emitted message
            DeviceSocket.emit("update", {latitude, longitude, accelerometer}, (message) => {
                // console.log(message)
            })
            // console.log("Server: Emmited data from server")
        }
        
        Device.find((err, resp) => {
            if(err){
                return res.json({data: "", msg: "Error in server: Couldn't get 1st Device"})
            }
            id = resp[0]._id
        })
        
        // Perform Geolocation with GMap API to get address from LngLat values
        const address = "Not Set yet"
        Device.updateOne({_id: id}, {$set : {latitude, longitude, accelerometer}}, (err, resp2) => {
            if(err){
                return res.json({data: "", msg: "Error in server trying to update Device"})
            }
            // OPTIONAL: Send a response to the user if you'd like
        })
        res.end("Update Successful")
    })
    */
    
    return route
}

// module.exports = route