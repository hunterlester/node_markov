function generate() {
    fetch("http://localhost:3000/generate")
    .then((res) => {
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
        let originalJoke = document.createElement('div');
        let h3 = document.createElement('h3');
        h3.innerText = "Original Joke";
        output.appendChild(h3);
        originalJoke.innerText = res.original;
        output.appendChild(originalJoke);
    });
}