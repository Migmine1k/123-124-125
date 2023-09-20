var narizX = 0;
var narizY = 0;
var diferenca = 0;
var pulsoDireito = 0;
var pulsoEsquerdo = 0;
var video, canvas, poseNet;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modeloCarregado);
    poseNet.on("pose", pegarPosicoes);
}

function modeloCarregado() {
    console.log('Posenet COMEÇOU');
}

function pegarPosicoes(results) {
    if (results.length > 0) {
        console.log(results);
        narizX = results[0].pose.nose.x;
        narizY = results[0].pose.nose.y; // Corrigido "Y" para minúsculo.

        pulsoEsquerdo = results[0].pose.leftWrist.x;
        pulsoDireito = results[0].pose.rightWrist.x;

        diferenca = floor(pulsoEsquerdo - pulsoDireito);
    }
}

function draw() {
    background('lightblue')
    document.getElementById("lado_quadrado").innerHTML = "Largura do quadrado é " + diferenca;
    fill('darkblue');
    stroke('darkblue');
    textSize(diferenca);
    text("migmine",narizX,narizY);
}