
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
        $('label[for="password"]')[0].innerText = 'User name must be more than or equal to 8 characters in length'
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
        $('label[for="phone"]')[0].innerText = 'Tel must be 10 numbers'
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

function emailValidate() {
    $('#email').attr('class', 'good')
    var email = $('#email')[0].value
    var at = 0, dot = 0
    var isAt = false, isDot = false
    for (var i=0; i<email.length; i++) {
        if ( ('a'>email[i] || email[i]>'z') && ('A'>email[i] || email[i]>'Z') && ('0'>email[i] || email[i]>'9') && email[i]!='@' && email[i]!='.') {
            $('label[for="email"]')[0].innerText = 'Only characters a-z, A-Z, 0-9, (@), (.) are allowed'
            $('#email').attr('class', 'bad')
        } else {
            if (email[i]=='@') {
                at++
                isAt = true
            }
            if (email[i]=='.') {
                // Dot must not after Dot
                if (isDot) {
                    $('label[for="email"]')[0].innerText = 'Email can not cotain consecutive dot (.)'
                    $('#email').attr('class', 'bad')
                }
                isDot = true

                // Dot after At must = 1
                if (isAt) {
                    dot++
                }
            } else {
                isDot = false
            }

        }
    }
    if (email[0]=='@' || email[0]=='.' || email[email.length-1]=='@' || email[email.length-1]=='.') {
        $('label[for="email"]')[0].innerText = 'The fist and the last characters can be (@) or (.)'
        $('#email').attr('class', 'bad')
    }
    if (at!=1 || dot!=1) {
        if (dot != 1) {
            $('label[for="email"]')[0].innerText = 'Email must have one and only one (.) character after (@) character'
        }
        if (at != 1) {
            $('label[for="email"]')[0].innerText = 'Email must have one and only one (@) character'
        }
        $('#email').attr('class', 'bad')
    }

    if (email.length == 0) {
        $('label[for="email"]')[0].innerText = 'Email must be filled'
        $('#email').attr('class', 'bad')
    }
    if ($('#email').attr('class') == 'good') {
        $('label[for="email"]')[0].innerText = ''
    }
    submitDisplay()
}


function submitDisplay() {
    var usernameStatus = $('#username').attr('class'),
        passwordStatus = $('#password').attr('class'),
        phoneStatus = $('#phone').attr('class'),
        emailStatus = $('#email').attr('class')
    if (usernameStatus == 'good' && passwordStatus == 'good' && phoneStatus == 'good' && emailStatus == 'good') {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}