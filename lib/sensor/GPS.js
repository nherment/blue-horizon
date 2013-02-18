var EventEmitter    = require("events").EventEmitter
var nmea            = require("nmea-0183");

/** Manage a uart connected GPS compatible with NMEA-0183
 *
 * @param serial
 * @constructor
 */
function GPS(serial) {

    var eventEmitter = new EventEmitter()

    var batchedSatellitesInfo

    serial.on('data', function (data) {
        var sentence = data.toString();
//        console.log(">"+ sentence);
        if(sentence && sentence.indexOf("$GPGGA") === 0 ||
            sentence.indexOf("$GPRMC") === 0 ||
            sentence.indexOf("$GPGSV") === 0 ||
            sentence.indexOf("$GPGSA") === 0 ||
            sentence.indexOf("$GPVTG") === 0) {

            var gpsData = nmea.parse(sentence);
            eventEmitter.emit("data", gpsData)
            eventEmitter.emit(gpsData.id, gpsData)

            if(gpsData.id === "GPGSV") {
                if(gpsData.mnum === 1) {
                    batchedSatellitesInfo = gpsData
                }
                if(batchedSatellitesInfo && gpsData.mnum > 1) {
                    batchedSatellitesInfo.sat = batchedSatellitesInfo.sat.concat(gpsData.sat)
                }
                if(batchedSatellitesInfo && gpsData.mnum === gpsData.msgs) {
                    delete batchedSatellitesInfo.mnum
                    delete batchedSatellitesInfo.msgs
                    eventEmitter.emit("sat", batchedSatellitesInfo)
                    batchedSatellitesInfo = undefined
                }
            }

        } else {

        }
    });

    this.on = function(event, callback) {
        eventEmitter.on(event, callback)
    }

    this.removeListener = function(event, callback) {
        eventEmitter.removeListener(event, callback)
    }
}

module.exports = GPS