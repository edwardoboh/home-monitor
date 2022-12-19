const express = require("express")
const route = express.Router()
const Home = require("../../model/Homes")

// GET      :[url]/home/
route.get("/", (req, res) => {
    let allHomes = []
    Home.find((err, resp) => {
        if(err){
            console.log("Error getting all homes")
            return res.json({data:"", msg:"Error getting all Homes"})
        }
        resp.forEach(respHome => {
            let properties = {
                id: respHome._id,
                name: respHome.name,
                address: respHome.address,
                email: respHome.email,
                phone: respHome.phone,
            }
            let geometry = {
                coordinates: [respHome.latitude, respHome.longitude]
            }
            allHomes.push({properties, geometry})
        })
        res.json({data: allHomes, msg: "Getting all Hospitals was successful"})
    })
})

// POST     :[url]/home/add
route.post("/add", (req, res) => {
    const {properties, geometry} = req.body
    const home = new Home({
            name: properties.name,
            address: properties.address,
            email: properties.email,
            latitude: geometry.coordinates[0],
            longitude: geometry.coordinates[1],
            phone: properties.phonePrimary,
    })
    home.save().then(resp => res.json({data: resp, msg: "Add was Successful"}))
    .catch(e => {
        console.log("Unable to add new home")
        res.json({data: "", msg: "Add Home Error in server"})
    })
})

// DELETE       :[url]/home/delete/{id}
route.delete("/delete/:id", (req, res) => {
    Home.deleteOne({_id: req.params.id}).then(resp => {
        res.json({data: resp, msg: "Delete was successful"})
    }).catch(e => {
        console.log("Delete Failed")
        res.json({data: "", msg: "Delete Failed in Server"})
    })
})
module.exports = route