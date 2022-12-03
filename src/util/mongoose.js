var mongooseUtil = {

    // Get random sushi
    getRandomSushi : function(sushi, amount) {
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
    getNewestNews: function(news, amount) {
        news = news.map(news => news.toObject())
        var newest = []
        for (var i=0; i<amount; i++) {
            newest[i] = news[i]
        }
        return newest
    },

}

module.exports = mongooseUtil