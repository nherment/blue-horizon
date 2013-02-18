
var EventEmitter = require("events").EventEmitter

function HMC6343(i2c, address) {

    var eventEmitter = new EventEmitter()

    var headingInterval = setInterval(updateHeading, 5000)

    var heading

    function updateHeading() {
        readHeading(function(err, hdg) {
            if(err) {
                console.log(err)
            } else {
                hdg.date = new Date()
                heading = hdg
                eventEmitter.emit("HDG", hdg)
            }
        })
    }

    function readHeading(callback) {
        i2c.write(address, "0x50", function(err) {

            if(err) { return callback(err, undefined) }

            i2c.readFloat(address, function(err, heading) {

                if(err) { return callback(err, undefined) }

                i2c.readFloat(address, function(err, pitch) {

                    if(err) { return callback(err, undefined) }

                    i2c.readFloat(address, function(err, roll) {

                        if(err) { return callback(err, undefined) }

                        callback(undefined, {heading: heading/10, pitch: pitch/10, roll: roll/10})

                    })

                })

            })
        })
    }

    this.on = function(event, callback) {
        eventEmitter.on(event, callback)
    }

    this.removeListener = function(event, callback) {
        eventEmitter.removeListener(event, callback)
    }

    this.setHeadingInterval = function(newInterval) {
        if(newInterval && newInterval > 0) {
            clearInterval(headingInterval)
            headingInterval = setInterval(updateHeading, newInterval)
        } else {
            throw new Error("Expected new interval to be greater than zero")
        }
    }
}
module.exports = HMC6343