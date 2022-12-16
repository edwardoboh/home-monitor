require("dotenv").config()
const express = require("express")
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
mongoose.connect(process.env.MONGO_URI, {
    auth: {
        username: process.env.MY_ACCESS_KEY_ID,
        password: process.env.MY_SECRET_ACCESS_KEY
    },
    authSource: '$external',
    authMechanism: 'MONGODB-AWS',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection to Database Successful"))

// app.get("/", (req, res) => {
//     res.send("Welcome to the server")
// })

app.use(express.json())
app.use("/hospital", require("./routes/ui/hospitalRoutes"))
app.use("/home", require("./routes/ui/homeRoutes"))
app.use("/device", require("./routes/ui/deviceRoutes"))
app.use("/sensor", require("./routes/sensor")(io))
// app.use("/sensor", require("./routes/sensor")(DeviceSocket))
app.use(express.static("client/build"))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});

module.exports = server;

