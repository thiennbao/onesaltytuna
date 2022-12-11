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
function nameValidate() {
    $('#name').attr('class', 'good')
    var name = $('#name')[0].value
    if (name.length <= 0) {
        $('label[for="name"]')[0].innerText = 'Name must be filled'
        $('#name').attr('class', 'bad')
    }
    if ($('#name').attr('class') == 'good') {
        $('label[for="name"]')[0].innerText = ''
    }
    userinfoSubmitDisplay()
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
    var usernameStatus = $('#name').attr('class'),
        phoneStatus = $('#phone').attr('class'),
        emailStatus = $('#email').attr('class'),
        addressStatus = $('#detail').attr('class')
    if (usernameStatus == 'good' && phoneStatus == 'good' && emailStatus == 'good' && addressStatus == 'good') {
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


// Card validate
function cardNumberValidate() {
    $('#cardnumber').attr('class', 'good')
    var cardnumber = $('#cardnumber')[0].value
    if (cardnumber.length != 12) {
        $('label[for="cardnumber"]')[0].innerText = 'Card Number must be 12 numbers in length'
        $('#cardnumber').attr('class', 'bad')
    }
    for (var i=0; i<cardnumber.length; i++) {
        if ('0'> cardnumber[i] || cardnumber[i] > '9') {
            $('label[for="cardnumber"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#cardnumber').attr('class', 'bad')
            break
        }
    }
    if ($('#cardnumber').attr('class') == 'good') {
        $('label[for="cardnumber"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function monthValidate() {
    $('#month').attr('class', 'good')
    var month = $('#month')[0].value
    if (month.length == 0) {
        $('label[for="month"]')[0].innerText = 'Month must be filled'
        $('#month').attr('class', 'bad')
    }
    for (var i=0; i<month.length; i++) {
        if ('0'> month[i] || month[i] > '9') {
            $('label[for="month"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#month').attr('class', 'bad')
            break
        }
    }
    if (Number(month) < 1 || Number(month) > 12) {
        $('label[for="month"]')[0].innerText = 'Month is not valid'
        $('#month').attr('class', 'bad')
    }
    if ($('#month').attr('class') == 'good') {
        $('label[for="month"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function yearValidate() {
    $('#year').attr('class', 'good')
    var year = $('#year')[0].value
    if (year.length == 0) {
        $('label[for="year"]')[0].innerText = 'Year must be filled'
        $('#year').attr('class', 'bad')
    } else if (year.length != 4) {
        $('label[for="year"]')[0].innerText = 'Year is not valid'
        $('#year').attr('class', 'bad')
    }
    for (var i=0; i<year.length; i++) {
        if ('0'> year[i] || year[i] > '9') {
            $('label[for="year"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#year').attr('class', 'bad')
            break
        }
    }
    if (Number(year) < (new Date()).getFullYear() || Number(year) > (new Date()).getFullYear() + 5) {
        $('label[for="year"]')[0].innerText = 'Year is not valid'
        $('#year').attr('class', 'bad')
    }


    if ($('#year').attr('class') == 'good') {
        $('label[for="year"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function ccvValidate() {
    $('#ccv').attr('class', 'good')
    var ccv = $('#ccv')[0].value
    if (ccv.length == 0) {
        $('label[for="ccv"]')[0].innerText = 'CCV must be filled'
        $('#ccv').attr('class', 'bad')
    }
    for (var i=0; i<ccv.length; i++) {
        if ('0'> ccv[i] || ccv[i] > '9') {
            $('label[for="ccv"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#ccv').attr('class', 'bad')
            break
        }
    }
    if ($('#ccv').attr('class') == 'good') {
        $('label[for="ccv"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function nameOnCardValidate() {
    $('#cardname').attr('class', 'good')
    var cardname = $('#cardname')[0].value
    if (cardname.length <= 0) {
        $('label[for="cardname"]')[0].innerText = 'Name must be filled'
        $('#cardname').attr('class', 'bad')
    }
    if ($('#cardname').attr('class') == 'good') {
        $('label[for="cardname"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function billingAddressValidate() {
    $('#billingaddr').attr('class', 'good')
    var billingaddr = $('#billingaddr')[0].value
    if (billingaddr.length <= 0) {
        $('label[for="billingaddr"]')[0].innerText = 'Billing Address must be filled'
        $('#billingaddr').attr('class', 'bad')
    }
    if ($('#billingaddr').attr('class') == 'good') {
        $('label[for="billingaddr"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}
function postalCodeValidate() {
    $('#postalcode').attr('class', 'good')
    var postalcode = $('#postalcode')[0].value
    if (postalcode.length == 0) {
        $('label[for="postalcode"]')[0].innerText = 'Postal Code must be filled'
        $('#postalcode').attr('class', 'bad')
    }
    for (var i=0; i<postalcode.length; i++) {
        if ('0'> postalcode[i] || postalcode[i] > '9') {
            $('label[for="postalcode"]')[0].innerText = 'Only numbers 0-9 are allowed'
            $('#postalcode').attr('class', 'bad')
            break
        }
    }
    if ($('#postalcode').attr('class') == 'good') {
        $('label[for="postalcode"]')[0].innerText = ''
    }
    cardSubmitDisplay()
}

function cardSubmitDisplay() {
    var cardnumberStatus = $('#cardnumber').attr('class'),
        monthStatus = $('#month').attr('class'),
        yearStatus = $('#year').attr('class'),
        ccvStatus = $('#ccv').attr('class'),
        cardnameStatus = $('#cardname').attr('class'),
        billingaddrStatus = $('#billingaddr').attr('class'),
        postalcodeStatus = $('#postalcode').attr('class')
    if (cardnumberStatus == 'good' && monthStatus == 'good' && yearStatus == 'good' && ccvStatus == 'good' && cardnameStatus == 'good' && billingaddrStatus == 'good' && postalcodeStatus == 'good') {
        document.getElementById('ch-card-submit').removeAttribute("disabled")
    } else {
        document.getElementById('ch-card-submit').setAttribute("disabled", "disabled")
    }
}


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