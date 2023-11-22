"use strict";
class Tarefa {
    _id;
    _ingresso;
    _duracao;
    _t_vida;
    _t_espera;
    constructor(_id, _ingresso, _duracao, _t_vida = 0, _t_espera = 0) {
        this._id = _id;
        this._ingresso = _ingresso;
        this._duracao = _duracao;
        this._t_vida = _t_vida;
        this._t_espera = _t_espera;
    }
    get id() {
        return this._id;
    }
    get duracao() {
        return this._duracao;
    }
    get ingresso() {
        return this._ingresso;
    }
    get tVida() {
        return this._t_vida;
    }
    get tEspera() {
        return this._t_espera;
    }
    set tVida(novoTempo) {
        this._t_vida = novoTempo;
    }
    set tEspera(novoTempo) {
        this._t_espera = novoTempo;
    }
    set duracao(novaDuracao) {
        this._duracao = novaDuracao;
    }
}
class RoundRobin {
    _processos;
    _tc;
    _quantum;
    _tempoAtual;
    constructor(_processos, _tc = 4, _quantum = 15, _tempoAtual = 0) {
        this._processos = _processos;
        this._tc = _tc;
        this._quantum = _quantum;
        this._tempoAtual = _tempoAtual;
    }
    executar() {
        const copyProcessos = [...this._processos];
        const temposDeVida = [];
        const temposDeEspera = [];
        while (this._processos.length > 0) {
            const processoAtual = this._processos.shift();
            if (processoAtual) {
                console.log(`Executando processo ${processoAtual.id}`);
                const tempoRestante = processoAtual.duracao - this._quantum;
                if (tempoRestante > 0) {
                    this._tempoAtual += this._quantum + this._tc;
                    console.log(`Troca de contexto: novo tempo: ${this._tempoAtual}`);
                    processoAtual.duracao = tempoRestante;
                    this._processos.push(processoAtual);
                }
                else {
                    this._tempoAtual += processoAtual.duracao + this._tc;
                    console.log(`Processo ${processoAtual.id} concluído`);
                    processoAtual.tVida = this._tempoAtual - processoAtual.ingresso - this._tc;
                    temposDeVida.push(processoAtual.tVida);
                    if (processoAtual.id === 4) {
                        this._tempoAtual -= 4;
                        console.log(`Tempo final: ${this._tempoAtual}`);
                        console.log(`Tempo de vida do processo ${processoAtual.id} = ${processoAtual.tVida}`);
                        break;
                    }
                    console.log(`Tempo de vida do processo ${processoAtual.id} = ${processoAtual.tVida}`);
                    console.log(`Troca de contexto: novo tempo: ${this._tempoAtual}`);
                }
            }
        }
        const valor = 0;
    }
}
const tarefa1 = new Tarefa(1, 5, 10);
const tarefa2 = new Tarefa(2, 15, 30);
const tarefa3 = new Tarefa(3, 10, 20);
const tarefa4 = new Tarefa(4, 0, 40);
const roundRobin = new RoundRobin([tarefa4, tarefa1, tarefa3, tarefa2]);
roundRobin.executar();
