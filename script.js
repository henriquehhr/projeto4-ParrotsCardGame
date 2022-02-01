
let numeroCartas;
do {
    numeroCartas = parseInt(prompt("Com quantas cartas deseja jogar (somente números pares de 4 a 14)?"));
} while(numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 != 0);