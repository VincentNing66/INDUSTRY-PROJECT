module.exports = {

    setCookie: setCookie,

    getCookie: getCookie,

    logout: logout

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return "";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function logout() {
    setCookie("username", "", -100);
    setCookie("userid", "", -100);
}

window.onload = function () {
    if ((getCookie("username") == "undefined" || getCookie("username") == "") && window.location.pathname !== "/loginform") {
        window.location.pathname = "/loginform";
    }
}
