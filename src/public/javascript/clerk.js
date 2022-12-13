function addAuth() {
    var name = $('input[name="name"]').val()
    var phone = $('input[name="phone"]').val()
    name = name.trim().toLowerCase().replaceAll(' ', '')
    $('input[name="supername"]').val(name)
    var pwString = `pw${name}${phone}`
    $('input[name="password"]').val(pwString)
}