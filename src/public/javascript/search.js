function search(pg) {
    var username = $('input[name="username"]').val(),
        phone = $('input[name="phone"]').val(),
        method = $('input[name="method"]:checked').val(),
        status = $('input[name="status"]:checked').val()
    if (method == 'all') {
        method = ''
    }
    if (status == 'all') {
        status = ''
    }
    $.ajax({
        url: `./search?username=${username}&phone=${phone}&method=${method}&status=${status}&page=${pg}`,
        type: 'GET'
    })
    .then(data => {
        var start = data.indexOf('<h2',data.indexOf('<span id="search-list-start"></span>'))
        var end = data.indexOf('<span id="search-list-end"></span>')
        var list = data.slice(start, end)
        var check = list.indexOf('<div class="user-info">')
        if (check != -1) {
            $('#search-list').html(list)
            $('#search-page').text(pg)
            fillTable()
        } else {
            page--
        }
        if (page == 0) {
            $('#search-page').text(pg)
            $('#search-list > div').hide()
            $('#empty').show()
        }
        if (!username && !phone && !method && !status) {
            $('#search-page').text('1')
            $('#search-list > div').hide()
            $('#empty').show()
        }
    })
    .catch(err => {
        console.log(err)
    })
}


// Fill table
function fillTable() {
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


// Page
var page = 1
function searchPrev() {
    page--
    if (page < 1) {
        page = 1
    }
    search(page)
}
function searchNext() {
    page++
    search(page)
}
search(page)

function searchBtn() {
    page = 1
    search(page)
}
