/**
 * Created by Alicia on 21/06/2015.
 */

var sentimentAnalysis = require('./sentiment-analysis');
var fetchTweets = require('./fetch-tweets');
var tflLines = require('./data/tfl-lines').lines;

var HP_API_KED = require('./keys.js').HP_API_KEY; // HP API key

var results = [];

function fetchTflSentiments(callback){
    var line = tflLines.pop(); // Get the next tfl line
    var tflKeywords = line + " line OR #" + line + "Line OR @" + line + "Line"; // create search string for tweets
    fetchTweets.fetchTweets(tflKeywords, function (twitterResults) {
        twitterResults = twitterResults.replace(/[^a-zA-Z ]/g, '');     // Get rid of all non-alpha characters
        if(twitterResults == "" || twitterResults == undefined){ twitterResults = "neutral"} // get rid of blanks
        sentimentAnalysis.fetchRoutes(twitterResults, HP_API_KED, function (sentimentResults) {
            results.push({line: line, sentiments: sentimentResults.aggregate.sentiment, score: sentimentResults.aggregate.score});
                if(tflLines.length>0) { fetchTflSentiments(callback) } // Still lines left, recall method
                else {  callback(results)  } // All done, call callback
        });
    });
}


exports.fetchTflSentiments = fetchTflSentiments;







