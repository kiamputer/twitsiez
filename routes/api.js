const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets')

// get a list of tweets from the database
router.get('/twitsies', function(req, res){
    res.send({type: 'GET'});
});

// add a new tweet to the database
router.post('/twitsies', function(req, res, next){
    Tweet.create(req.body).then(function(tweet){
        res.send(tweet);
    }).catch(next);
});

// update a tweet in the database
router.put('/twitsies/:id', function(req, res){
    Tweet,findByIdandUpdate({_od: req.params.id}, req.body).then(function(){
        Tweet.findOne({_id: req.params.id}).then(function(tweet){
            res.send(tweet);
        })
    })
});

// delete a tweet from the database
router.delete('/twitsies/:id', function(req, res){
    Tweet.findByIdAndRemove({_id: req.params.id}).then(function(tweet){
        res.send(tweet);
    });
});

module.exports = router;