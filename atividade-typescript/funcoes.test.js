"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const funcoes_1 = require("./funcoes");
describe('Testes das funções', () => {
    test('quadradoComFor deve retornar os quadrados corretos', () => {
        expect((0, funcoes_1.quadradoComFor)([3, 5, 7, 3, 8, 9, 1])).toEqual([9, 25, 49, 9, 64, 81, 1]);
    });
    test('quadradoComForEach deve retornar os quadrados corretos', () => {
        expect((0, funcoes_1.quadradoComForEach)([3, 5, 7, 3, 8, 9, 1])).toEqual([9, 25, 49, 9, 64, 81, 1]);
    });
    test('concatenarComEspaco deve unir as palavras com espaço', () => {
        expect((0, funcoes_1.concatenarComEspaco)(['Arrays', 'com', 'TypeScript'])).toBe('Arrays com TypeScript');
    });
    test('ordenarArray deve ordenar corretamente', () => {
        expect((0, funcoes_1.ordenarArray)(['carro', 'boneco', 'ave', 'lapis'])).toEqual(['ave', 'boneco', 'carro', 'lapis']);
    });
    test('doisPrimeiros deve retornar os dois primeiros elementos', () => {
        expect((0, funcoes_1.doisPrimeiros)([2, 4, 6, 2, 8, 9, 5])).toEqual([2, 4]);
    });
    test('filtrarPares deve retornar apenas os números pares', () => {
        expect((0, funcoes_1.filtrarPares)([8, 3, 9, 5, 6, 12])).toEqual([8, 6, 12]);
    });
});
