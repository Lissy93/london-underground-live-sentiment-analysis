/**
 * Created by Alicia on 21/06/2015.
 */

var twitter = require('twitter');

function fetchTweets(keyword, keys,  callback) {

    var client = new twitter({
        consumer_key: keys.CONSUMER_KEY,
        consumer_secret: keys.CONSUMER_SECRET,
        access_token_key: keys.ACCESS_TOKEN_KEY,
        access_token_secret: keys.ACCESS_TOKEN_SECRET
    });

    client.get('search/tweets', {q: keyword, /*geocode: '51.5286417,-0.1015987,50km',*/ count: 200}, function (error, tweets, response) {
        var results = "";
        tweets.statuses.forEach(function(eachTweet){
            results += eachTweet.text+" \n"
        });
        if(results.length>500){results = results.substring(1, 500);}
        callback(results);
    });

}

exports.fetchTweets = fetchTweets;