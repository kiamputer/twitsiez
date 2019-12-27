var OAuth = require('oauth');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
var request = require('request');

var keys = {
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret,
    user_id: config.username,
    user_pass: config.password
}
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    keys.consumer_key,
    keys.consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
);

//GET /search/tweets.json
oauth.get(
    'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi',
    keys.access_token,
    keys.access_token_secret,
    function (error, body, response){
        if (error) console.error(error);
        console.log(body);
    });

//POST statuses/update: https://api.twitter.com/1.1/statuses/update.json
function postTweet(postBody) {
    console.log('status text is: ' + postBody + '\n');
    var status = {'status': postBody};
    oauth.post('https://api.twitter.com/1.1/statuses/update.json',
        keys.access_token,
        keys.access_token_secret,
        status,
        function(error, body) {
            console.log('postTweet body:\n' + (error || body));
        });
}
module.exports = {
    postTweet
}
