
function fillTable() {
    var order = document.querySelectorAll('#order-list > div')
    for (var i=0; i<order.length; i++) {
        var cart = document.querySelectorAll('.cart')[i].innerText
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
        document.querySelectorAll('.grandtotal')[i].innerText = `Grand Total: ${grandTotal}$`
    }
}

// Pagination for Order list
var page = 1
function loadPage(pg) {
    $.ajax({
        url: `./super?page=${pg}`,
        type: 'GET'
    })
    .then(data => {
        var start = data.indexOf('<',data.indexOf('<span id="order-list-start"></span>'))
        var end = data.indexOf('<span id="order-list-end"></span>')
        var list = data.slice(start, end)
        var check = data.indexOf('<div>',data.indexOf('<span id="order-list-start"></span>'))
        if (check != -1) {
            $('#order-list').html(list)
            $('#order-page').text(pg)
            fillTable()
        } else {
            page--
        }
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
