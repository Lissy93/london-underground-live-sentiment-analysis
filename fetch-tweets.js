/**
 * Created by Alicia on 21/06/2015.
 */

var twitter = require('twitter');

var TWITTER_KEYS = require('./keys').TWITTER_API;

var location = ''; // 'lat,'

function fetchTweets(keyword, callback) {

    var client = new twitter({
        consumer_key: TWITTER_KEYS.CONSUMER_KEY,
        consumer_secret: TWITTER_KEYS.CONSUMER_SECRET,
        access_token_key: TWITTER_KEYS.ACCESS_TOKEN_KEY,
        access_token_secret: TWITTER_KEYS.ACCESS_TOKEN_SECRET
    });

    client.get('search/tweets', {q: keyword, geocode: '51.5286417,-0.1015987,50km', count: 200}, function (error, tweets, response) {
        var results = "";
        tweets.statuses.forEach(function(eachTweet){
            results += eachTweet.text+" "
        });
       callback(results);
    });

}

exports.fetchTweets = fetchTweets;