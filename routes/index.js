var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var cache = { START: [], END: [] };

router.get('/', function(_req, res) {
  res.render('index');
});

router.get('/clear', function( _req, res) {
  cache = { START: [], END: [] };
  res.sendStatus(200);
});

router.get('/train', function(_req, res) {
  var generatedJoke = []; 
  fetch("https://icanhazdadjoke.com", {
    headers: {
      "Accept": "application/json",
      "User-Agent": "Node Markov (https://github.com/hunterlester/node_markov)"
    }
  })
  .then(response => response.json())
  .then((data) => {
      let originalJoke = data.joke.slice(0);
      let wordArray = data.joke.split(" ");
      for ( var x = 0; x < wordArray.length; x++) {
          if ( x === 0 ) {
            cache['START'].push(wordArray[x]);
            generatedJoke.push(cache['START'][Math.floor(Math.random() * Math.floor(cache['START'].length))]);
          }
          if ( x === wordArray.length - 1 ) {
            cache['END'].push(wordArray[x]);
          }
          var currentWordSet;
          if ( cache[wordArray[x]] ) {
              cache[wordArray[x]].push(wordArray[x + 1]);
              currentWordSet = cache[wordArray[x]];
          } else {
             cache[wordArray[x]] = [wordArray[x + 1]];
             currentWordSet = cache[wordArray[x]];
          }
          generatedJoke.push(currentWordSet[Math.floor(Math.random() * Math.floor(currentWordSet.length))])
      }
      data.joke = generatedJoke.join(' ');
      data.original = originalJoke;
      res.json(data);
  });
});

router.get('/generate', function(_req, res) {
    var generatedJoke = [];
    if ( !cache['START'].length ) {
        return res.json({ joke: "You must train first." });
    }
    var currentWord = cache['START'][Math.floor(Math.random() * Math.floor(cache['START'].length))];
    generatedJoke.push(currentWord);
    while (true) {
        currentWord = cache[currentWord][Math.floor(Math.random() * Math.floor(cache[currentWord].length))];
        generatedJoke.push(currentWord);
        if ( cache['END'].includes(currentWord) ) {
          break;
        }
    }
    var data = { joke: generatedJoke.join(' ') };
    res.json(data);
});

module.exports = router;
