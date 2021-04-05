const express = require("express")
require("dotenv").config()
const app = express()
const http = require("http")
const mongoose = require("mongoose")
const socketio = require("socket.io")

const server = http.createServer(app)
const io = socketio(server)

// ******************
// let DeviceSocket;
// io.on("connection", (Socket) => {
//     console.log("Server: Client is connected to the server")
//     DeviceSocket = Socket
//     Socket.on("disconnect", () => console.log("Client has disconnected from server"))

// })
// ******************


// Connection to database
MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connection to Database Successful"))

app.get("/", (req, res) => {
    res.send("Welcome to the server")
})

app.use(express.json())
app.use("/hospital", require("./routes/ui/hospitalRoutes"))
app.use("/device", require("./routes/ui/deviceRoutes"))
app.use("/sensor", require("./routes/sensor")(io))
// app.use("/sensor", require("./routes/sensor")(DeviceSocket))

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`server started on port ${PORT}`))

