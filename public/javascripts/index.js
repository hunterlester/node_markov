function train() {
    fetch("http://localhost:3000/train")
    .then((res) => {
        let output = document.getElementById('output');
        output.innerText = res.joke;
    });
}

function generate() {
    fetch("http://localhost:3000/generate")
    .then(res => res.json())
    .then((res) => {
        let output = document.getElementById('output');
        console.log(res);
        output.innerText = res.joke;
    });
}