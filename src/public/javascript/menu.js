const dish_type = $('#menu-menu #dish-type div')
$('#dishes div').hide()
$(`.${document.querySelector('.menu-current').innerText}`).show()
for (let i = 0; i < dish_type.length; i++) {
    dish_type[i].onclick = function() {
        $(`.${document.querySelector('.menu-current').innerText}`).hide()
        $('.menu-current').css({"background-color":"white","color":"black"})
        $('.menu-current').removeClass('menu-current')
        $(`.${dish_type[i].innerText}`).show()
        this.style = "background-color:$main-color; color:white"
        this.classList.add('menu-current')
    }
}

class Dish {
    constructor (name, price, quantity) {
        this.name = name;
        this.price = Number(price);
        this.quantity = quantity;
    }
}
const dishes = $('#dishes > div')
const dish = []
const selectedDish = []

var total
var cart = {}

function table(i) {
    $('#cart-table tbody').children().eq(i).children().eq(3).html(dish[i].quantity)
    $('#cart-table tbody').children().eq(i).children().eq(4).html(`$ ${dish[i].quantity*dish[i].price}`)
    dishes[i].children[4].children[1].innerHTML = dish[i].quantity
    document.querySelector('#cart-table tbody').innerHTML = ''
    $('#cart-form input')[0].value = ''
    total = 0
    selectedDish.forEach(function(item, index) {
        document.querySelector('#cart-table tbody').innerHTML += `<tr><td>${index+1}</td><td>${dish[item[1]].name}</td><td>${dish[item[1]].price}$</td><td>${dish[item[1]].quantity}</td><td>${dish[item[1]].price*dish[item[1]].quantity}$</td></tr>`
        total += dish[item[1]].price*dish[item[1]].quantity
        $('#cart-form input')[0].value += `${dish[item[1]].name},${dish[item[1]].quantity},${dish[item[1]].price},${dish[item[1]].price*dish[item[1]].quantity};`
    })
    if (selectedDish.length != 0) {
        $('#cart table tfoot td span').html(`${total}$`)} else {$('#cart table tfoot td span').html('')
    }

    
    form()
}
function cart(i) {

}
for (let i=0; i < dishes.length; i++) {
    dishes[i].innerHTML+='<div class="pick"><p>-</p><p>0</p><p>+</p></div>'
    dish[i] = new Dish(dishes[i].children[1].innerText,dishes[i].children[3].innerText.replace(/\s/g,'').replace('$',''),0)
    $('#cart-table tbody').children().eq(i).hide()

    // Subtract
    dishes[i].children[4].children[0].onclick = function() {
        if (dish[i].quantity != 0) { // Min = 0
            dish[i].quantity -= 1
            if (dish[i].quantity == 0) {
                // $('#cart-form input')[4].value = ''
                selectedDish.forEach(function(item, index) {
                    if (item[1] == i) {selectedDish.splice(index, 1)}
                })
            }
            table(i)
        }
    }
    // Add
    dishes[i].children[4].children[2].onclick = function() {
        dish[i].quantity += 1
        if (dish[i].quantity == 1) {
            selectedDish.push([$('#cart-table tbody').children().eq(i),i])
        }
        table(i)
    }
}

// Activate submit
function form() {
    if ( ($('#cart-form input')[0].value == '') ) {
        document.getElementById('submit').setAttribute("disabled", "disabled")
    } else {
        document.getElementById('submit').removeAttribute("disabled")
    }
}

// Image
var illustrativeImageMore = $('#illustrative-image-more div');
for (let i = 0; i < illustrativeImageMore.length; i++) {
    illustrativeImageMore[i].onmouseover = function() {
        illustrativeImageMore[i].style.animation = 'img-in 0.5s forwards';
    };
    illustrativeImageMore[i].onmouseout = function() {
        illustrativeImageMore[i].style.animation = 'img-out 0.5s forwards';
    };
};


function searchBtn() {
    var key = $('#key').val(), cost = $('#cost').val()
    if (!key) {key = null}
    if (!cost) {cost = null}
    dishes.each(function(index, dish) {
        $('#dish-type').hide()
        document.querySelectorAll('#dishes > div')[index].style.display = 'none'
        if (dish.children[1].innerText.toLowerCase().search(key) != -1) {
            document.querySelectorAll('#dishes > div')[index].style.display = 'block'
        }
        if (dish.children[2].innerText.toLowerCase().search(key) != -1) {
            document.querySelectorAll('#dishes > div')[index].style.display = 'block'
        }
        if (dish.children[3].innerText.search(cost) != -1) {
            document.querySelectorAll('#dishes > div')[index].style.display = 'block'
        }
    })
}
function clearBtn() {
    dishes.each(function(index) {
        $('#dish-type').show()
        document.querySelectorAll('#dishes > div')[index].style.display = 'block'
        $('#key').val('')
        $('#cost').val('')
    })
}