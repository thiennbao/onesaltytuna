const button = $('#btn > div')
$('#box > div').hide()
$(`#${document.querySelector('.btn-current').id}-box`).show()
for (let i = 0; i < button.length; i++) {
    button[i].onclick = function() {
        $(`#${document.querySelector('.btn-current').id}-box`).hide()
        $(`#${button[i].id}-box`).show()
        $('.btn-current').removeClass('btn-current')
        this.classList.add('btn-current')
    }
}

// User info validate
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
    userinfoSubmitDisplay()
}
function emailValidate() {
    $('#email').attr('class', 'good')
    var email = $('#email')[0].value
    var at = 0, dot = 0
    var isAt = false, isDot = false
    for (var i=0; i<email.length; i++) {
        if ( ('a'>email[i] || email[i]>'z') && ('A'>email[i] || email[i]>'Z') && ('0'>email[i] || email[i]>'9') && email[i]!='@' && email[i]!='.') {
            $('label[for="email"]')[0].innerText = 'Email is not valid'
            $('#email').attr('class', 'bad')
        } else {
            if (email[i]=='@') {
                at++
                isAt = true
            }
            if (email[i]=='.') {
                if (isDot) {
                    $('label[for="email"]')[0].innerText = 'Email is not valid'
                    $('#email').attr('class', 'bad')
                }
                isDot = true
                if (isAt) {
                    dot++
                }
            } else {
                isDot = false
            }

        }
    }
    if (email[0]=='@' || email[0]=='.' || email[email.length-1]=='@' || email[email.length-1]=='.') {
        $('label[for="email"]')[0].innerText = 'Email is not valid'
        $('#email').attr('class', 'bad')
    }
    if (at!=1 || dot!=1) {
        if (dot != 1) {
            $('label[for="email"]')[0].innerText = 'Email is not valid'
        }
        if (at != 1) {
            $('label[for="email"]')[0].innerText = 'Email is not valid'
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
    userinfoSubmitDisplay()
}
function addressValidate() {
    $('#detail').attr('class', 'good')
    var address = $('#detail')[0].value
    if (address.length <= 0) {
        $('label[for="address"]')[0].innerText = 'Address must be filled'
        $('#detail').attr('class', 'bad')
    }
    if ($('#detail').attr('class') == 'good') {
        $('label[for="address"]')[0].innerText = ''
    }
    userinfoSubmitDisplay()
}
function userinfoSubmitDisplay() {
    var phoneStatus = $('#phone').attr('class'),
        emailStatus = $('#email').attr('class'),
        addressStatus = $('#detail').attr('class')
    if (phoneStatus == 'good' && emailStatus == 'good' && addressStatus == 'good') {
        document.getElementById('ch-userinfo-submit').removeAttribute("disabled")
    } else {
        document.getElementById('ch-userinfo-submit').setAttribute("disabled", "disabled")
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
    userinfoSubmitDisplay()
}

$('#userDistrict').hide()
$('#userCity').hide()


// Password validate
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
    passwordSubmitDisplay()
}
function newPasswordValidate() {
    $('#new-password').attr('class', 'good')
    var newPassword = $('#new-password')[0].value
    if (newPassword.length < 8) {
        $('label[for="new-password"]')[0].innerText = 'Password must be more than or equal to 8 characters in length'
        $('#new-password').attr('class', 'bad')
    }
    if ($('#new-password').attr('class') == 'good') {
        $('label[for="new-password"]')[0].innerText = ''
    }
    passwordSubmitDisplay()
}
function submitPasswordValidate() {
    $('#submit-password').attr('class', 'good')
    var submitPassword = $('#submit-password')[0].value
    var newPassword = $('#new-password')[0].value
    if (submitPassword.length < 8) {
        $('label[for="submit-password"]')[0].innerText = 'Password must be more than or equal to 8 characters in length'
        $('#submit-password').attr('class', 'bad')
    }
    if (submitPassword != newPassword) {
        $('label[for="submit-password"]')[0].innerText = 'Password does not match'
        $('#submit-password').attr('class', 'bad')
    }
    if ($('#submit-password').attr('class') == 'good') {
        $('label[for="submit-password"]')[0].innerText = ''
    }
    passwordSubmitDisplay()
}

function passwordSubmitDisplay() {
    var passwordStatus = $('#password').attr('class'),
        newPasswordStatus = $('#new-password').attr('class'),
        submitPasswordStatus = $('#submit-password').attr('class')
    if (passwordStatus == 'good' && newPasswordStatus == 'good' && submitPasswordStatus == 'good') {
        document.getElementById('ch-password-submit').removeAttribute("disabled")
    } else {
        document.getElementById('ch-password-submit').setAttribute("disabled", "disabled")
    }
}