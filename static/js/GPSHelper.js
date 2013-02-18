
function latToDms(deg) {
    var hemisphere = "S"

    if(deg >= 0) {
        hemisphere = "N"
    }

    return degToDms(deg) + " " + hemisphere
}

function lngToDms(deg) {
    var hemisphere = "W"

    if(deg >= 0) {
        hemisphere = "E"
    }

    return degToDms(deg) + " " + hemisphere
}

function degToDms(deg) {

    deg = Math.abs(deg);

    var d = Math.floor(deg);
    var minfloat = (deg-d)*60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat-m)*60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60. These two
    // if-tests are not necessary if no rounding is done.
    if (s==60) {
        m++;
        s=0;
    }
    if (m==60) {
        d++;
        m=0;
    }

    if(d < 10) {
        d = "0"+d;
    }

    if(m < 10) {
        m = "0"+m
    }

    if(s < 100) {
        if(s < 10) {
            s = "00"+s
        } else {
            s = "0"+s
        }
    }
    return (d + "&deg; " + m + "&#39; " + s + "&quot;")
}