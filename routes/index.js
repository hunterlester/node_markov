var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var cache = { start: [], end: [] };

router.get('/', function(_req, res) {
  res.render('index');
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
      let wordArray = data.joke.split(" ");
      for ( var x = 0; x < wordArray.length; x++) {
          if ( x === 0 ) {
            cache['start'].push(wordArray[x]);
            generatedJoke.push(cache['start'][Math.floor(Math.random() * Math.floor(cache['start'].length))]);
          } else if ( x === wordArray.length - 1) {
            cache['end'].push(wordArray[x]);
            generatedJoke.push(cache['end'][Math.floor(Math.random() * Math.floor(cache['end'].length))]);
            break;
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
      console.log(generatedJoke);
      data.joke = generatedJoke.join(' ');
      console.log(data);
      res.json(data);
  });
});

router.get('/generate', function(_req, res) {
  res.render('index');
});

module.exports = router;
