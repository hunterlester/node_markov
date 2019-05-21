var paddingCache = 10;

function generate() {
    let button = document.getElementById('generate');
    button.innerText = "Generating...";
    button.setAttribute("disabled", "true");
    fetch("http://localhost:3000/generate")
    .then(res => res.json())
    .then((res) => {
        let originalJokeOutput = document.getElementById('original');
        originalJokeOutput.innerHTML = '';
        button.innerText = "Generate";
        button.removeAttribute("disabled");
        let output = document.getElementById('output');
        output.innerText = res.joke;
    });
}

function train() {
    let button = document.getElementById('train');
    button.innerText = "Learning...";
    button.setAttribute("disabled", "true");
    fetch("http://localhost:3000/train")
    .then(res => res.json())
    .then((res) => {
        button.innerText = "Train";
        button.removeAttribute("disabled");
        let output = document.getElementById('output');
        output.innerText = res.joke;

        let originalJokeOutput = document.getElementById('original');
        originalJokeOutput.innerHTML = '';
        let originalJoke = document.createElement('div');
        let h3 = document.createElement('h3');
        h3.innerText = "Original Joke";
        originalJokeOutput.appendChild(h3);
        originalJoke.innerText = res.original;
        originalJokeOutput.appendChild(originalJoke);
        paddingCache += 2;
        button.style.padding = paddingCache;
    });
}

function clear2() {
    let button = document.getElementById('clear');
    button.innerText = "Clearing...";
    button.setAttribute("disabled", "true");
    fetch("http://localhost:3000/clear")
    .then(() => {
        paddingCache = 10;
        let trainButton = document.getElementById('train');
        trainButton.style.padding = paddingCache;
        button.innerText = "Clear";
        button.removeAttribute("disabled");
        let output = document.getElementById('output');
        output.innerText = '';

        let originalJokeOutput = document.getElementById('original');
        originalJokeOutput.innerHTML = '';
    });
}