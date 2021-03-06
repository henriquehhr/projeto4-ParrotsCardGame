let numeroCartas;

let papagaios;

let primeiraCartaClicada;

let numeroDeJogadas;

let cartasFaltantes;

let tempo;

let intervaloTempo;

let numeroCartasClicadas;

const containerCartas = document.querySelector(".container-cartas");

const relogio = document.querySelector("#relogio");

function iniciarJogo(){
    primeiraCartaClicada = null;
    numeroDeJogadas = 0;
    tempo = 0;
    numeroCartasClicadas = 0;
    while (containerCartas.firstChild) {
        containerCartas.removeChild(containerCartas.lastChild);
    }

    do {
        numeroCartas = parseInt(prompt("Com quantas cartas deseja jogar (somente números pares de 4 a 14)?"));
    } while(numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 != 0);

    papagaios.sort(randomizar);
    colocarCartas();
    relogio.innerText = tempo;
    intervaloTempo = setInterval(mostrarTempo, 1000);
}

function randomizar() { 
	return Math.random() - 0.5; 
}

function inicializarPapagaios(){
    let papagaio = document.createElement("img");
    papagaios = [];
    papagaio.setAttribute("src", "images/bobrossparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/explodyparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/fiestaparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/metalparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/revertitparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/tripletsparrot.gif")
    papagaios.push(papagaio);
    papagaio = document.createElement("img");
    papagaio.setAttribute("src", "images/unicornparrot.gif")
    papagaios.push(papagaio);
}

function colocarCartas(){
    let cartas = [];
    for(let i = 0; i < numeroCartas/2; i++){
        let clonePapagaio = papagaios[i].cloneNode(false);
        
        let divVerso = document.createElement("div");
        divVerso.classList.add("verso", "face");
        divVerso.setAttribute("data-identifier", "back-face");
        let divFrente = document.createElement("div");
        divFrente.classList.add("frente", "face");
        divFrente.setAttribute("data-identifier", "front-face");
        let divCarta = document.createElement("div");
        divCarta.classList.add("carta");
        divCarta.setAttribute("data-identifier", "card");
        let imgFrente = document.createElement("img");
        imgFrente.setAttribute("src", "images/front.png");
        divFrente.append(imgFrente);
        divVerso.append(papagaios[i]);
        divCarta.append(divFrente, divVerso);
        divCarta.setAttribute("onclick", "clicarCarta(this)");

        let divVerso2 = document.createElement("div");
        divVerso2.classList.add("verso", "face");
        divVerso2.setAttribute("data-identifier", "back-face");
        let divFrente2 = document.createElement("div");
        divFrente2.classList.add("frente", "face");
        divFrente.setAttribute("data-identifier", "front-face");
        let divCarta2 = document.createElement("div");
        divCarta2.classList.add("carta");
        divCarta.setAttribute("data-identifier", "card");
        imgFrente = document.createElement("img");
        imgFrente.setAttribute("src", "images/front.png");
        divFrente2.append(imgFrente);
        divVerso2.append(clonePapagaio);
        divCarta2.append(divFrente2, divVerso2);
        divCarta2.setAttribute("onclick", "clicarCarta(this)");

        cartas.push(divCarta);
        cartas.push(divCarta2);
    }
    
    cartas.sort(randomizar);

    for(let i = 0; i < numeroCartas; i++){
        containerCartas.append(cartas[i]);
    }

    cartasFaltantes = numeroCartas;
}

function mostrarTempo(){
    tempo++;
    relogio.innerText = tempo;
}

function clicarCarta(cartaClicada){
        
        if(numeroCartasClicadas === 2){
            return;
        }
        numeroCartasClicadas++;
        numeroDeJogadas++;
        cartaClicada.classList.toggle("carta-clicada");
        if(primeiraCartaClicada === null){
            primeiraCartaClicada = cartaClicada;
            primeiraCartaClicada.setAttribute("onclick", "");
        } else {
            if (primeiraCartaClicada.querySelector(".verso img").getAttribute("src") != cartaClicada.querySelector(".verso img").getAttribute("src")){
                setTimeout(desvirarCartas, 1000, primeiraCartaClicada, cartaClicada);
                primeiraCartaClicada.setAttribute("onclick", "clicarCarta(this)");
            }
            else {
                primeiraCartaClicada.setAttribute("onclick", "");
                cartaClicada.setAttribute("onclick", "");
                cartasFaltantes-=2;
                numeroCartasClicadas = 0;
                if(cartasFaltantes === 0){
                    clearInterval(intervaloTempo);
                    setTimeout(terminarJogo, 500, numeroDeJogadas, tempo);
                }
            }
            primeiraCartaClicada = null;
        }
}

function desvirarCartas(primeiraCartaClicada , cartaClicada){
    cartaClicada.classList.remove("carta-clicada");
    primeiraCartaClicada.classList.remove("carta-clicada");
    numeroCartasClicadas = 0;
}

function terminarJogo(numeroDeJogadas, tempo){
    alert(`Você ganhou em ${numeroDeJogadas} jogadas e em ${tempo} segundos`);
    if(prompt("Deseja jogar novamente: s ou n?").toLowerCase() === "s") {
        iniciarJogo();
    }
}

inicializarPapagaios();

iniciarJogo();