var fs = require("fs")
var SerialRunner = require("serial").SerialRunner

var PRESETS_DIR = __dirname+"/preset"
var MUX_DIR = "/sys/kernel/debug/omap_mux"

var PinConfiguration = JSON.parse(fs.readFileSync(__dirname+"/PinConfiguration.json"))

function loadPresets(callback) {

    fs.readdir(PRESETS_DIR, function(err, files) {
        if(err) return callback(err)

        var presets = {}

        var runner = new SerialRunner()

        function loadPreset(file, callback) {
            loadJSON(file, function(err, preset) {
                if(err) return callback(err)

                if(!presets.hasOwnProperty(preset.name)) {
                    presets[preset.name] = preset
                    callback()
                } else {
                    callback(new Error("Preset ["+preset.name+"] is defined in ["+file+"] but was already defined in another file."))
                }
            })
        }

        for(var i = 0 ; i < files.length ; i++) {

            if(isPresetFile(files[i])) {
                runner.add(loadPreset, PRESETS_DIR+"/"+files[i])
            }

        }

        runner.onError(function(err) {
            runner.stop()
            callback(err, undefined)
        });

        runner.run(function() {
            callback(undefined, presets)
        })


    })

}

function isPresetFile(fileName) {
    return fileName.indexOf(".json") === fileName.length - 5
}

function loadJSON(file, callback) {

    fs.readFile(file, function(err, content) {
        if(err) return callback(err, undefined)

        try {
            content = JSON.parse(content)
        } catch(err) {
            return callback(new Error("Content of file ["+file+"] is not json"), undefined)
        }

        callback(undefined, content)
    })

}

function applyPreset(preset) {

    console.log("Applying preset ["+preset.name+"]")

    var pin, config, muxSettings

    var headerRows = ["P8", "P9"]

    for(var i = 0 ; i < headerRows.length ; i++) {
        if(preset.hasOwnProperty(headerRows[i])) {
            for(pin in preset[headerRows[i]]) {

                config = preset[headerRows[i]][pin].config
                muxSettings = getConfigNumber(config)
                console.log("configuring pin ["+headerRows[i]+"."+pin+"] to ["+muxSettings.toString(16)+"] for ["+preset[headerRows[i]][pin].name+"]")
                configure(headerRows[i], pin, muxSettings)
            }
        }
    }
}

function configure(headerRow, pin, muxSettings) {
    var pinConfig = PinConfiguration[headerRow][pin]

    var cmd = "echo "+muxSettings.toString(16)+" > "+MUX_DIR+"/"+pinConfig.modes[0]
    console.log(cmd)
}

function getConfigNumber(config) {
    var number = 0

    if(config.input) {
        number = 0x20
    }
    if(config.pullUp) {
        number = number | 0x10
    }
    if(config.pullEnabled) {
        number = number | 0x08
    }
    number = number | config.mode

    return number
}

loadPresets(function(err, presets) {
    if(err) throw err

    for(var presetName in presets) {
        applyPreset(presets[presetName])
    }
})