// Fill cart table
var cartCookie = $('#cartItem').val()
var cart = cartCookie.split(';')
var grandTotal = 0
var cartItem = []
for (var i=0; i<cart.length-1; i++) {
    cartItem[i] = cart[i].split(',')
}
cartItem.forEach(function (item, index) {
    document.querySelector('#cart-table tbody').innerHTML += `<tr><td>${index+1}</td><td>${item[0]}</td><td>${item[1]}$</td><td>${item[2]}</td><td>${item[3]}$</td></tr>`
    grandTotal += Number(item[3])
})
$('#grandtotal').text(`Grand Total: ${grandTotal}$`)

// Check dist and city
function citySelect() {
    if ($('#city').val() == 'Other') {
        document.getElementById('district').setAttribute('disabled', 'true')
        $('#district').val('')
    } else {
        document.getElementById('district').removeAttribute('disabled')
        $('#userDist').hide()
        $('#district').val('1st Dist')
    }
    ship()
}
$('#userDistrict').hide()
$('#userCity').hide()

// Check if pay by card
function payMethod() {
    var method = document.querySelectorAll('input:checked')[0].value
    if (method == 'card') {
        $('#pay').css('display', 'block')
    } else {
        $('#pay').css('display', 'none')
    }
}

// Ship
document.querySelector('#cart-table tbody').innerHTML += '<tr id="ship"></tr>'
function ship(city, dist) {
    var ship, grandTotalWithShip
    var city = $('#city').val(), dist = $('#district').val()
    if (city == 'Other') {
        ship = 5
    } else {
        if (dist == '1st Dist' || dist == '3rd Dist' || dist == '4th Dist' || dist == '6th Dist' || dist == '8th Dist' || dist == '10th Dist' || dist == '11th Dist' ) {
            ship = 1
        } else if (dist == '2nd Dist' || dist == '7th Dist' || dist == 'Tan Phu Dist' || dist == 'Tan Binh Dist' || dist == 'Phu Nhuan Dist') {
            ship = 2
        } else {
            ship = 3
        }
    }
    document.getElementById('ship').innerHTML = `<td></td> <td colspan="3">Shipping charges: </td> <td>${ship}$</td>`
    grandTotalWithShip = grandTotal + ship
    $('#grandtotal').text(`Grand Total: ${grandTotalWithShip}$`)
}
ship()

// Form validate

// Name
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

// Phone
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

// Address
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

// Card Number
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
    submitDisplay()
}

// Expiration
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
    submitDisplay()
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
    submitDisplay()
}

// CCV
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
    submitDisplay()
}

// Name On Card
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
    submitDisplay()
}

// Billing Address
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
    submitDisplay()
}

// Postal Code
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
    submitDisplay()
}


function submitDisplay() {
    var usernameStatus = $('#name').attr('class'),
        phoneStatus = $('#phone').attr('class'),
        addressStatus = $('#detail').attr('class')
    if (usernameStatus == 'good' && phoneStatus == 'good' && addressStatus == 'good') {
        if (document.querySelectorAll('input:checked')[0].value == 'card') {
            submitWithCardDisplay()
        } else {
            document.getElementById('submit').removeAttribute("disabled")
        }
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}
function submitWithCardDisplay() {
    var cardnumberStatus = $('#cardnumber').attr('class'),
        monthStatus = $('#month').attr('class'),
        yearStatus = $('#year').attr('class'),
        ccvStatus = $('#ccv').attr('class'),
        cardnameStatus = $('#cardname').attr('class'),
        billingaddrStatus = $('#billingaddr').attr('class'),
        postalcodeStatus = $('#postalcode').attr('class')
    if (cardnumberStatus == 'good' && monthStatus == 'good' && yearStatus == 'good' && ccvStatus == 'good' && cardnameStatus == 'good' && billingaddrStatus == 'good' && postalcodeStatus == 'good') {
        document.getElementById('submit').removeAttribute("disabled")
    } else {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    }
}

submitDisplay()