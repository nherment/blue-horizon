var spawn = require("child_process").spawn;
var EventEmitter = require("events").EventEmitter
var exec = require("child_process").exec

function Serial2 () {
    var eventEmitter = new EventEmitter()

    tty2 = spawn('cat', ['/dev/ttyO2']);


    tty2.stdout.on('data', function (data) {
        eventEmitter.emit("data", data)
    })

    tty2.stderr.on('data', function (data) {
        throw new Error(data.toString())
    });

    tty2.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });

    this.setup = function(callback) {

        var cmd1 = "echo 1 > /sys/kernel/debug/omap_mux/spi0_d0"
        exec(cmd1, {}, function(error, stdout, stderr) {

            if(error) {
                console.error(stderr)
                console.error(JSON.stringify(error))
                callback(new Error("Error setting up  UART2 TX through command ["+cmd1+"]"))
            } else {

                var cmd2 = "echo 21 > /sys/kernel/debug/omap_mux/spi0_sclk"
                exec(cmd2, {}, function(error, stdout, stderr) {

                    if(error) {
                        console.error(stderr)
                        console.error(JSON.stringify(error))
                        callback(new Error("Error setting up  UART2 RX through command ["+cmd2+"]"))
                    } else {
                        callback()
                    }
                })
            }


        })
    }

    this.on = function(event, callback) {
        eventEmitter.on(event, callback)
    }

    this.removeListener = function(event, callback) {
        eventEmitter.removeListener(event, callback)
    }
}

module.exports = new Serial2()