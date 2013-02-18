var Facade = {}


/** ************************************ **/
/**                USERS                 **/
/** ************************************ **/


Facade.getUser = function(login, callback) {
    $.get("/user/"+login, function(result) {
        if(result && result._error) {
            callback(new Error(result._error), undefined)
        } else {
            callback(undefined, result)
        }
    })
}

Facade.getUsers = function(callback) {
    $.get("/user/getUsers", function(result) {
        if(result && result._error) {
            callback(new Error(result._error), undefined)
        } else {
            callback(undefined, result)
        }
    })
}

/** ************************************ **/
/**                ADMIN                 **/
/** ************************************ **/

Facade.getLoginStatus = function(callback) {
    $.get("/user/status", function(result) {
        if(result && result._error) {
            callback(new Error(result._error), undefined)
        } else {
            callback(undefined, result)
        }
    })
}

Facade.login = function(login, pass, callback) {
    var admin = {
        login: login,
        password: pass
    }
    $.ajax({
        url: "/user/login",
        type: "POST",
        data: JSON.stringify(admin),
        contentType:"application/json",
        success: function(result) {
            if(result && result._error) {
                callback(new Error(result._error), undefined)
            } else {
                callback(undefined, result)
            }
        },
        error: function(err) {
            callback(err, undefined)
        }
    })
}


/** ************************************ **/
/**                INSTALL               **/
/** ************************************ **/

Facade.getInstallStatus = function(callback){
    $.ajax({
        url: "/install/",
        type: "GET",
        success:function(result){
            if(result && result._error) {
                callback(new Error(result._error), undefined)
            } else {
                callback(undefined, result)
            }
        },
        error: function(err) {
            callback(err, undefined)
        }
    })
}



/** ************************************ **/
/**                 PAGES                **/
/** ************************************ **/


Facade.savePage = function(page, callback){
    $.ajax({
        url: "/page",
        type: "PUT",
        data: page,
        success:function(result){
            if(result && result._error) {
                callback(new Error(result._error), undefined)
            } else {
                callback(undefined, result)
            }
        },
        error: function(err) {
            callback(err, undefined)
        }
    })
}

Facade.getPage = function(pageUrl, callback){
    $.ajax({
        url: "/page/"+pageUrl,
        type: "GET",
        success:function(result){
            if(result && result._error) {
                callback(new Error(result._error), undefined)
            } else {
                callback(undefined, result)
            }
        },
        error: function(err) {
            callback(err, undefined)
        }
    })
}

Facade.listPages = function(callback){
    $.ajax({
        url: "/page/list",
        type: "POST",
        data: {},
        success:function(result){
            if(result && result._error) {
                callback(new Error(result._error), undefined)
            } else {
                callback(undefined, result)
            }
        },
        error: function(err) {
            callback(err, undefined)
        }
    })
}