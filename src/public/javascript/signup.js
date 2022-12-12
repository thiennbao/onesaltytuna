
function usernameValidate(newUsername) {
    $('#username').attr('class', 'good')
    var username = $('#username')[0].value
    if (username == newUsername) {
        $('#username').attr('class', 'bad')
    }
    if (username.length < 4 || username.length > 20) {
        $('label[for="username"]')[0].innerText = 'User name must be between 4 and 20 characters in length'
        $('#username').attr('class', 'bad')
    }
    for (var i=0; i<username.length; i++) {
        if ( ('a' > username[i] || username[i] > 'z') && ('A' > username[i] || username[i] > 'Z') && ('0'> username[i] || username[i] > '9') ) {
            $('label[for="username"]')[0].innerText = 'Only characters a-z, A-Z, 0-9 are allowed'
            $('#username').attr('class', 'bad')
            break
        }
    }
    if ($('#username').attr('class') == 'good') {
        $('label[for="username"]')[0].innerText = ''
    }
    submitDisplay()
}

function passwordValidate() {
    $('#password').attr('class', 'good')
    var password = $('#password')[0].value
    if (password.length < 8) {
        $('label[for="password"]')[0].innerText = 'Password must be more than or equal to 8 characters in length'
        $('#password').attr('class', 'bad')
    }
    if ($('#password').attr('class') == 'good') {
        $('label[for="password"]')[0].innerText = ''
    }
    submitDisplay()
}

function phoneValidate() {
    $('#phone').attr('class', 'good')
    var phone = $('#phone')[0].value
    if (phone.length != 10) {
        $('label[for="phone"]')[0].innerText = 'Phone must be 10 numbers'
        $('#phone').attr('class', 'bad')
    }
    for (var i=0; i<phone.length; i++) {
        if ('0'> phone[i] || phone[i] > '9') {
            $('label[for="phone"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#phone').attr('class', 'bad')
            break
        }
    }
    if ($('#phone').attr('class') == 'good') {
        $('label[for="phone"]')[0].innerText = ''
    }
    submitDisplay()
}

function addressValidate() {
    $('#address').attr('class', 'good')
    var address = $('#address')[0].value
    if (address.length <= 0) {
        $('label[for="address"]')[0].innerText = 'Address must be filled'
        $('#address').attr('class', 'bad')
    }
    if ($('#address').attr('class') == 'good') {
        $('label[for="address"]')[0].innerText = ''
    }
    submitDisplay()
}

function submitDisplay() {
    var usernameStatus = $('#username').attr('class'),
        passwordStatus = $('#password').attr('class'),
        phoneStatus = $('#phone').attr('class'),
        addressStatus = $('#address').attr('class')
    if (usernameStatus == 'good' && passwordStatus == 'good' && phoneStatus == 'good' && addressStatus == 'good') {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}

function citySelect() {
    if ($('#city').val() == 'Other') {
        document.getElementById('dist').setAttribute('disabled', 'true')
        $('#dist').val('')
    } else {
        document.getElementById('dist').removeAttribute('disabled')
        $('#dist').val('1st Dist')
    }
}

$('#userDistrict').hide()
$('#userCity').hide()
submitDisplay()