var exec = require("child_process").exec

function I2C(id) {

    this.write = function(adress, buffer, callback) {

        var cmd = "i2cset -y "+id+" "+adress+" "+buffer
//        console.log(cmd)
        exec(cmd, {}, function(error, stdout, stderr) {

            if(error) {
                console.error(stderr)
                console.error(JSON.stringify(error))
                callback(new Error("Error writing I2C "+id+" "+adress))
            } else {
                callback(undefined)
            }
        })
    }

    /** reads 2 Bytes, MSB then LSB and create a number out of it
     *
     * @param adress
     * @param callback
     */
    this.readFloat = function(adress, callback) {

        var cmd = "i2cget -y "+id+" "+adress
//        console.log(cmd)
        exec(cmd, {}, function(error, msb, stderr) {

            if(error) {

                console.error(stderr)
                console.error(JSON.stringify(error))
                callback(new Error("Error reading I2C "+id+" "+adress))

            } else {

//                console.log(cmd)
                exec(cmd, {}, function(error, lsb, stderr) {

                    if(error) {

                        console.error(stderr)
                        console.error(JSON.stringify(error))
                        callback(new Error("Error reading I2C "+id+" "+adress))

                    } else {

                        var msbInt = parseInt(msb, 16)
                        var lsbInt = parseInt(lsb, 16)

                        callback(undefined, msb*256 + lsbInt)
                    }


                })
            }


        })
    }
}

module.exports = I2C