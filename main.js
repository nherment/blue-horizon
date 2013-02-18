
var spawn = require("child_process").spawn;
var nmea = require("nmea-0183");

tty2    = spawn('cat', ['/dev/ttyO2']);

tty2.stdout.on('data', function (data) {
    var sentence = data.toString();
    if(sentence && sentence.indexOf("$GPGGA") === 0 || sentence.indexOf("$GPRMC") === 0 || sentence.indexOf("$GPGSV") === 0) {
        console.log(JSON.stringify(nmea.parse(sentence)));
    } else {
//        console.log(">"+ sentence);
    }
});

tty2.stderr.on('data', function (data) {
    throw new Error(data.toString())
});

tty2.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});


var exec = require("child_process").exec


setInterval(function() {
    exec("i2cset -y 3 0x19 0x50", {}, function(error, stdout) {


        if(error) {
            console.error(JSON.stringify(error))
            process.exit(1)
        }
        setTimeout(function() {

            readFloat(function(heading) {

                console.log("heading: "+heading)

                readFloat(function(pitch) {

                    console.log("pitch: "+pitch)

                    readFloat(function(roll) {

                        console.log("roll: "+roll)
                    })
                })
            })

        }, 1)

    })
}, 200)



function readFloat(callback) {

    exec("i2cget -y 3 0x19", {}, function(error, msb) {

        if(error) {
            console.error(JSON.stringify(error))
            process.exit(1)
        }


        exec("i2cget -y 3 0x19", {}, function(error, lsb) {

            if(error) {
                console.error(JSON.stringify(error))
                process.exit(1)
            }

            var msbInt = parseInt(msb, 16)
            var lsbInt = parseInt(lsb, 16)

            callback(msb*256 + lsbInt)


        })


    })
}