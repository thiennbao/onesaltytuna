function validate() {
    var user = $('#username')[0].value
    var pass = $('#password')[0].value

    if (user.length!=0 && pass.length!=0) {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}