function addImgDir() {
    var name = $('#add input[name="name"]').val().toLowerCase()
    name = name.trim().toLowerCase().replaceAll(' ', '-')
    $('#add input[name="img"]').val(`img/news/news_${name}`)
}

function search(pg) {
    var name = $('#name').val()
    console.log(name)
    $.ajax({
        url: `./news?name=${name}&page=${pg}`,
        type: 'GET'
    })
    .then(data => {
        var start = data.indexOf('<h3',data.indexOf('<span id="search-list-start"></span>'))
        var end = data.indexOf('<span id="search-list-end"></span>')
        var list = data.slice(start, end)
        var check = list.indexOf('class="news-detail"')
        if (check != -1) {
            $('#search-list').html(list)
            $('#search-page').text(pg)
        } else {
            page--
        }
        if (page == 0) {
            $('#search-page').text(pg)
            $('#search-list > div').hide()
            $('#empty').show()
        }
        if (!name) {
            $('#search-page').text('1')
            $('#search-list > div').hide()
            $('#empty').show()
        }
    })
    .catch(err => {
        console.log(err)
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