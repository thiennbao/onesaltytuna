
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
    $('#detail').attr('class', 'good')
    var address = $('#detail')[0].value
    if (address.length <= 0) {
        $('label[for="address"]')[0].innerText = 'Address must be filled'
        $('#detail').attr('class', 'bad')
    }
    if ($('#detail').attr('class') == 'good') {
        $('label[for="address"]')[0].innerText = ''
    }
    submitDisplay()
}

function submitDisplay() {
    var usernameStatus = $('#name').attr('class'),
        phoneStatus = $('#phone').attr('class'),
        addressStatus = $('#detail').attr('class')
    if (usernameStatus == 'good' && phoneStatus == 'good' && addressStatus == 'good') {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}

function citySelect() {
    if ($('#city').val() == 'Other') {
        document.getElementById('district').setAttribute('disabled', 'true')
        $('#district').val('')
    } else {
        document.getElementById('district').removeAttribute('disabled')
        $('#district').val('1st District')
    }
}

$('#userDistrict').hide()
$('#userCity').hide()
submitDisplay()