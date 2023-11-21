"use strict";
// import { input, getNumber } from "../utils.js";
// class Tarefa {
//     constructor(
//         private _id: number,
//         private _ingresso: number,
//         private _duracao: number
//     ) {}
// }
// class RoundRobin {
//     constructor(
//         private _processos: Tarefa[],
//         private _tc: number,
//         private _quantum: number,
//         private _tempoAtual: number = 0
//     ) {}
//     inserir(processo: Tarefa) {
//         this._processos.push(processo);
//     }
//     executar() {
//         while (this._processos.length > 0) {
//             const processoAtual = this._processos.shift()
//             if (processoAtual) {
//             }
//         }
//     }
// }
class Tarefa {
    _id;
    _ingresso;
    _duracao;
    constructor(_id, _ingresso, _duracao) {
        this._id = _id;
        this._ingresso = _ingresso;
        this._duracao = _duracao;
    }
    get id() {
        return this._id;
    }
    get duracao() {
        return this._duracao;
    }
    set duracao(novaDuracao) {
        this._duracao = novaDuracao;
    }
}
class RoundRobin {

    constructor(private _processos: Tarefa[], private _tc: number = 4, private _quantum = 15, private _tempoAtual = 0) {}

    executar() {
        while (this._processos.length > 0) {
            const processoAtual = this._processos.shift(); 
            if (processoAtual) {
                console.log(`Executando processo ${processoAtual.id}`);
                const tempoRestante = processoAtual.duracao - this._quantum;
                if (tempoRestante > 0) {
                    this._tempoAtual += this._quantum;
                    processoAtual.duracao = tempoRestante;
                    this._processos.push(processoAtual);
                }
                else {
                    this._tempoAtual += processoAtual.duracao;
                    console.log(`Processo ${processoAtual.id} concluído`);
                }
               
                this._tempoAtual += this._tc;
            }
        }
    }
}

const tarefa1 = new Tarefa(1, 5, 10);
const tarefa2 = new Tarefa(2, 15, 30);
const tarefa3 = new Tarefa(3, 10, 20);
const tarefa4 = new Tarefa(4, 0, 40);
const roundRobin = new RoundRobin([tarefa4, tarefa1, tarefa3, tarefa2], 4, 15);
roundRobin.executar();
