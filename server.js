
//var I2C     = require("./lib/interface/I2C.js")
//var HMC6343 = require("./lib/sensor/HMC6343.js")
//var GPS     = require("./lib/sensor/GPS.js");
//var Serial2 = require("./lib/interface/Serial2.js")

var express = require('express')
var app     = express()
var server  = require('http').createServer(app)
var io      = require('socket.io').listen(server)

server.listen(3001, '::')
app.use(express.static(__dirname + '/static'))
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/static/index.html')
});
app.get('/*', function (req, res) {
    res.sendfile(__dirname + '/static/index.html')
});

//var i2c_3 = new I2C("3")
//
//var hmc6343 = new HMC6343(i2c_3, "0x19")
//
//var heading
//var position
//
//Serial2.setup(function(err) {
//    if(err) {
//        throw err
//    }
//    console.log("UART2 is ready")
//})
//
//var gps = new GPS(Serial2)

io.sockets.on('connection', function (socket) {

    function updatePosition(data) {
        socket.emit('GPGGA', data)
    }
    function updateHeading(data) {
        socket.emit('HDG', data)
    }
    function updateSatellites(data) {
        socket.emit('GPGSV', data)
    }
    function updatePositionPrecision(data) {
        socket.emit('GPGSA', data)
    }
    function updateVTG(data) {
        socket.emit('GPVTG', data)
    }

    function updateWifiConfig() {
        socket.emit('wifi-config', {
            wifiSignals: [
                {name:"turtle", signal:"40"},
                {name:"duboce_dogz", signal:"90", secure: true},
                {name:"krypton", signal:"20"}
            ]
        })
    }

    function updateGPSStatus() {
        socket.emit('GPS', {
            longitude: 43.124647,
            latitude: 3.456231,
            speed: 4,
            course: 273
        })
    }

    function updateHeading() {
        socket.emit('heading', {
            heading: 234
        })
    }

    updateWifiConfig()
    updateGPSStatus()
    updateHeading()
//    gps.on("GPGGA", updatePosition)
//    gps.on("GPGSA", updatePositionPrecision)
//    gps.on("GPVTG", updateVTG)
//    gps.on("sat", updateSatellites)
//
//    hmc6343.on("HDG", updateHeading)

    socket.on('close', function() {

//        gps.removeListener("GPGGA", updatePosition)
//        gps.removeListener("sat", updateSatellites)
//        gps.removeListener("GPGSA", updatePositionPrecision)
//        gps.removeListener("GPVTG", updateVTG)
//
//        hmc6343.removeListener("HDG", updateHeading)

    })
})