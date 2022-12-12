
function fillTable() {
    var order = document.querySelectorAll('#order-list > div')
    var cart = $('.cart')
    cart.each(function(i) {
        var cart = $(this).text()
        var cartItem = cart.split(';')
        var grandTotal = 0
        var cartContent = []
        for (var j=0; j<cartItem.length-1; j++) {
            cartContent[j] = cartItem[j].split(',')
        }
        cartContent.forEach(function (item, index) {
            document.querySelectorAll('.order-content tbody')[i].innerHTML += `<tr><td>${index+1}</td><td>${item[0]}</td><td>${item[1]}$</td><td>${item[2]}</td><td>${item[3]}$</td></tr>`
            grandTotal += Number(item[3])
        })
        
        var ship = document.querySelectorAll('.ship')[i].innerText
        document.querySelectorAll('.order-content tbody')[i].innerHTML +=`<td></td> <td colspan="3">Shipping charges: </td> <td>${ship}$</td>`
        grandTotal += Number(ship)

        document.querySelectorAll('.grandtotal')[i].innerText = `Grand Total: ${grandTotal}$`
    })
}

// Pagination for Order list
var page = 1
function loadPage(pg) {
    $.ajax({
        url: `./list?page=${pg}`,
        type: 'GET'
    })
    .then(data => {
        var start = data.indexOf('<h2',data.indexOf('<span id="order-list-start"></span>'))
        var end = data.indexOf('<span id="order-list-end"></span>')
        var list = data.slice(start, end)
        var check = list.indexOf('<div class="user-info">')
        if (check != -1) {
            $('#order-list').html(list)
            $('#order-page').text(pg)
            fillTable()
        } else {
            page--
        }
        if (page == 0) {
            $('#order-page').text(pg)
            $('#empty').show()
        }
        card()
        $('input[name="super"]').val($('#userNav').text().slice(4))
    })
    .catch(err => {
        console.log('ERROR')
    })
}
function orderPrev() {
    page--
    if (page < 1) {
        page = 1
    }
    loadPage(page)
}
function orderNext() {
    page++
    loadPage(page)
}
loadPage(page)


// Card
function card() {
    var method = document.querySelectorAll('.method')
    var cardBtn = document.querySelectorAll('.card-btn')
    for (var i=0; i<method.length; i++) {
        if (method[i].innerText == 'card') {
            cardBtn[i].style.visibility = 'visible'
        }
    }
}
function showCard(id) {
    $(`#user-${id}`).hide()
    $(`#card-${id}`).show()
}
function hideCard(id) {
    $(`#card-${id}`).hide()
    $(`#user-${id}`).show()
}
