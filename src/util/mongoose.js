var mongooseUtil = {

    // Get data
    getData(data) {
        return data.map(data => data.toObject())
    },

    // Get random sushi
    getRandomSushi(sushi, amount) {
        sushi = sushi.map(sushi => sushi.toObject())
        var randomNum, randomSushiID = [], randomSushi = [], loop
        for (var i=0; i<amount; i++) {
            do {
                do {
                    loop = false
                    randomNum = Math.floor(Math.random()*100)
                    for (var j=0; j<randomSushiID.length; j++) {
                        if (randomNum == randomSushiID[j]) {
                            loop = true;
                        }
                    }
                } while (loop)
                randomSushiID[i] = randomNum
            } while (randomSushiID[i] >= sushi.length)
            randomSushi[i] = sushi[randomSushiID[i]]
        }
        return randomSushi
    },

    // Get newest news
    getNewestNews(news, amount) {
        news = news.map(news => news.toObject())
        var newest = []
        for (var i=0; i<amount; i++) {
            newest[i] = news[news.length-1-i]
            newest[i].date = `${news[news.length-1-i].date.getDate()} - ${news[news.length-1-i].date.getMonth()} - ${news[news.length-1-i].date.getFullYear()}`
        }
        return newest
    },

    // Searching
    searchOrder(order, req) {
        var foundItem = order.map(order => order.toObject())
        var i = 0
        var keys = ['username', 'phone', 'method', 'status']
        keys.forEach(function(key) {
            if (req.query[key]) {
                foundItem.forEach(function(item, index) {
                    if (item[key].toString().search(req.query[key]) != -1) {
                        foundItem[i] = item
                        i++
                    }
                })
                foundItem.splice(i, foundItem.length)
                i = 0
            }

        })
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        const pageSize = 3
        var start = ( page - 1 ) * pageSize
        foundItem.splice(0, start)
        foundItem.splice(start + pageSize, foundItem.length)
        return foundItem
    },

    // Searching Sushi
    searchSushi(sushi, req) {
        var foundItem = sushi.map(sushi => sushi.toObject())
        var i = 0
        var keys = ['name', 'type', 'cost', 'description']
        keys.forEach(function(key) {
            if (req.query[key]) {
                foundItem.forEach(function(item, index) {
                    if (item[key].toString().search(req.query[key]) != -1) {
                        foundItem[i] = item
                        i++
                    }
                })
                foundItem.splice(i, foundItem.length)
                i = 0
            }

        })
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        const pageSize = 8
        var start = ( page - 1 ) * pageSize
        foundItem.splice(0, start)
        foundItem.splice(start + pageSize, foundItem.length)
        return foundItem
    },

    // Search News
    search(data, req, keys, size) {
        var foundItem = data.map(data => data.toObject())
        var i = 0
        keys.forEach(function(key) {
            if (req.query[key]) {
                foundItem.forEach(function(item, index) {
                    if (item[key].toString().toLowerCase().search(req.query[key]) != -1) {
                        foundItem[i] = item
                        i++
                    }
                })
                foundItem.splice(i, foundItem.length)
                i = 0
            }

        })
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        var start = ( page - 1 ) * size
        foundItem.splice(0, start)
        foundItem.splice(start + size, foundItem.length)
        return foundItem
    }

}

module.exports = mongooseUtil