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

}

module.exports = mongooseUtil