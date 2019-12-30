const Oauth = require('oauth');
const config = require('./config');
const requests = require('request');
var fs = require('fs');
var tweet = require('./tweet');

var keys = {
    reddit_token: config.reddit_token,
    reddit_secret: config.reddit_secret,
    redirect_uri: 'https://localhost:3000'
};


var scope = "read"

var random_string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
var auth_url = 'https://www.reddit.com/api/v1/authorize?clientid=' + keys.reddit_token
    + '&response_type=code'
    + '&state=' + keys.reddit_token + ':' + keys.reddit_secret
    + '&redirect_url=' + keys.redirect_uri + '&duration=permanent'
    +'&scope=' + scope

var testurl = 'https://www.reddit.com/r/financialindependence/.json?count=10'

var oauth = new Oauth.OAuth2(keys.reddit_token,keys.reddit_secret,auth_url)

function parseText(data, callback) {
    var num_posts = data.match(/"selftext": /g).length;
    var self_text = [];
    const post_start = '\"selftext\": \"'
    const post_end = '\", \"author_fullname\"';

    var start_index = data.search(post_start) + post_start.length;
    var end_index = data.search(post_end);

    for (var i = 1; i < num_posts; i++) {
        if (end_index)
            var str = data.substring(start_index, end_index);
        self_text.push(str);
        //console.log(self_text);

        data = data.substring(end_index + 1, data.length)

        start_index = data.search(post_start) + post_start.length;
        end_index = data.search(post_end);
    }
     callback(self_text);
}

function generateData(callback) {
    var posts = [];
    oauth.get(testurl,
        keys.reddit_token,
        function (statusCode, data) {
            if (statusCode) {
                console.log(statusCode);
            }
            parseText(data, callback)
        });
    //console.log(posts);
}

 module.exports = {
     generateData,
 }

