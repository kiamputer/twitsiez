// read in all posts. each word will have before, after words that
// correspond to the inputted texts
const HashMap = require('HashMap');

class wordNode {
    constructor(word) {
        this.word = word;
        this.after = [];
        this.count = 1;
    }
}

function arrayify(posts) {
    var dictionary = [];

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var words = post.split(' ');
        var str = words.toString();
        words = str.split('\\n');
        str = words.toString();
        words = str.split('\\n\\n');
        str = words.toString();
        words = str.split(',');
        for (j = 0; j < words.length; j++) {
            var chars = words[j];
            if (chars.indexOf('\\u') != -1){
                var u = chars.indexOf('\\u');
                words[j] = chars.substring(0,u) + chars.substring(u+6,chars.length)
            }
        }
        for (j = 0; j < words.length; j++) {
            var chars = words[j];
            if (chars.indexOf('.') != -1){
                var u = chars.indexOf('.');
                words[j] = chars.substring(0,u) + chars.substring(u+1,chars.length)
                dictionary.push(words[j])
                dictionary.push('.');
            }
            else if (chars.indexOf('!') != -1){
                words[j] = chars.substring(0,u) + chars.substring(u+1,chars.length)
                dictionary.push(words[j]);
                dictionary.push('!');
            }
            else if (chars != ''){
                dictionary.push(words[j]);
            }
        }
        dictionary.push(words);
    }
    console.log(dictionary)
    return dictionary;
}

function generateMap(posts) {
    var words = arrayify(posts);
    var map = new HashMap(); //map = string:[wordNode]
    var flag = 0;

    for (var j = 0; j < words.length; j++) {
        var currentWord = words[j];
        //console.log(currentWord)
        //check if currentWord is in map
        if (!map.has(currentWord)) {
            var node = new wordNode(words[j+1])
            map.set(currentWord, [node]);
        }
        else if (map.has(currentWord)) {
            var arr = map.get(currentWord);
            //check if word after exists in the array
            if (arr.find(function(node) {
                return (node.word) == words[j+1]
                })){
                var currNode = arr.find(function(node) {
                    return node.word == words[j+1]
                    });
                currNode.count++;
            }
            else {
                arr.push(new wordNode(words[j+1]));
            }
        }
     }
    return map;
}

function markovProcess(posts) {
    var map = generateMap(posts);
}

module.exports = {
    markovProcess
}

