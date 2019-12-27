const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create tweet Schema & model
const TweetSchema = new Schema({
    status: {
        type: String,
        required: [true, 'Status field is required']
    }
});

const Tweet = mongoose.model('tweet', TweetSchema);
module.exports = Tweet;