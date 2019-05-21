function generate() {
    fetch("http://localhost:3000/generate")
    .then((res) => {
        let output = document.getElementById('output');
        output.innerText = res.joke;
    });
}

function train() {
    fetch("http://localhost:3000/train")
    .then(res => res.json())
    .then((res) => {
        let output = document.getElementById('output');
        output.innerText = res.joke;
        let originalJoke = document.createElement('div');
        originalJoke.innerText = res.original;
        output.appendChild(originalJoke);
    });
}