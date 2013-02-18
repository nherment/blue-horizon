
var EventEmitter    = require("events").EventEmitter
var fs              = require("fs")

/** A Serial communication object.
 *
 * @param serialDevice path to the file descriptor of the serial port. eg. "/dev/tty02"
 * @constructor
 */
function Serial(serialDevice) {

    var self = this
    var eventEmitter = new EventEmitter()

    var fileDescriptor
    var watcher
    var opened = false

    this.addListener = function(event, callback) {
        eventEmitter.addListener(event, callback)
    }

    this.removeListener = function(event, callback) {
        eventEmitter.removeListener(event, callback)
    }

    this.open = function() {
        if(opened) {
            throw new Error("serial is already opened");
        }

        fs.open(serialDevice, "r+", function(err, fd) {

            if(err) return error(err)

            opened = true
            fileDescriptor = fd

            watcher = fs.watch(serialDevice)
            watcher.addListener("change", onData)
            watcher.addListener("error", error)

            eventEmitter.emit("connected")

        })
    }

    this.close = function() {

        if(!opened) {
            throw new Error("serial already closed")
        }

        fs.close(fileDescriptor, function(err) {

            eventEmitter.emit("closed", err)

            watcher.removeListener("change", onData)
            watcher.removeListener("error", error)

            watcher.close()

            opened = false
        })
    }

    var bufferSize = 1024

    function onData() {

        var buffer = new Buffer(bufferSize)

        // TODO: loop is bytesRead == bufferSize
        fs.read(fd, buffer, /*offset*/ 0, /*length*/ buffer.length, /*position*/ 0, function(err, bytesRead, buffer) {
            eventEmitter.emit("data", buffer)
        })
    }

    function error(err) {
        eventEmitter.emit("error", err)
    }

}

module.exports = Serial;