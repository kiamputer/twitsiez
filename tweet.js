const twitter = require('./twitter_auth');
const reddit = require('./reddit_auth');
const generator = require('./gen_tweet');

function startTwitsiez() {
    //var postBody = generateTweet();
    twitter.postTweet(postBody)
}

reddit.generateData(generator.markovProcess);
//setInterval(startTwitsiez,5*1000); //every 5 seconds
