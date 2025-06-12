"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadradoComFor = quadradoComFor;
exports.quadradoComForEach = quadradoComForEach;
exports.concatenarComEspaco = concatenarComEspaco;
exports.ordenarArray = ordenarArray;
exports.doisPrimeiros = doisPrimeiros;
exports.filtrarPares = filtrarPares;
function quadradoComFor(arr) {
    const resultado = [];
    for (let i = 0; i < arr.length; i++) {
        resultado.push(arr[i] ** 2);
    }
    return resultado;
}
function quadradoComForEach(arr) {
    const resultado = [];
    arr.forEach(num => resultado.push(num ** 2));
    return resultado;
}
function concatenarComEspaco(arr) {
    return arr.join(" ");
}
function ordenarArray(arr) {
    return [...arr].sort();
}
function doisPrimeiros(arr) {
    return arr.slice(0, 2);
}
function filtrarPares(arr) {
    return arr.filter(num => num % 2 === 0);
}
