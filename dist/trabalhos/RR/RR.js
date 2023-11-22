"use strict";
class Tarefa {
    _id;
    _ingresso;
    _duracao;
    _t_vida;
    _t_espera;
    _duracaoOriginal;
    constructor(_id, _ingresso, _duracao, _t_vida = 0, _t_espera = 0, _duracaoOriginal = 0) {
        this._id = _id;
        this._ingresso = _ingresso;
        this._duracao = _duracao;
        this._t_vida = _t_vida;
        this._t_espera = _t_espera;
        this._duracaoOriginal = _duracaoOriginal;
        this._duracaoOriginal = this._duracao;
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
    get duracaoOriginal() {
        return this._duracaoOriginal;
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
        const temposDeVida = [];
        const temposDeEspera = [];
        while (this._processos.length > 0) {
            const processoAtual = this._processos.shift();
            if (processoAtual) {
                console.log(`Executando processo ${processoAtual.id}`);
                const tempoRestante = processoAtual.duracao - this._quantum;
                if (tempoRestante > 0) {
                    this._tempoAtual += this._quantum + this._tc;
                    console.log(`\nTroca de contexto: novo tempo: ${this._tempoAtual}`);
                    processoAtual.duracao = tempoRestante;
                    this._processos.push(processoAtual);
                }
                else {
                    this._tempoAtual += processoAtual.duracao + this._tc;
                    console.log(`\nProcesso ${processoAtual.id} concluído`);
                    processoAtual.tVida =
                        this._tempoAtual - processoAtual.ingresso - this._tc;
                    temposDeVida.push(processoAtual.tVida);
                    processoAtual.tEspera = processoAtual.tVida - processoAtual.duracaoOriginal;
                    temposDeEspera.push(processoAtual.tEspera);
                    console.log(`\nTempo de vida do processo ${processoAtual.id} = ${processoAtual.tVida}`);
                    console.log(`Tempo de espera do processo ${processoAtual.id} = ${processoAtual.tEspera}`);
                    console.log(`\nTroca de contexto: novo tempo: ${this._tempoAtual}`);
                }
            }
        }
        const somaVida = temposDeVida.reduce((acc, cur) => acc + cur);
        const tempoMedioVida = somaVida / temposDeVida.length;
        const somaEspera = temposDeEspera.reduce((acc, cur) => acc + cur);
        const tempoMedioEspera = somaEspera / temposDeEspera.length;
        console.log(`\nTempo médio de vida: ${tempoMedioVida.toFixed(2)}`);
        console.log(`Tempo médio de Espera: ${tempoMedioEspera.toFixed(2)}`);
    }
}
const tarefa1 = new Tarefa(1, 5, 30);
const tarefa2 = new Tarefa(2, 15, 10);
const tarefa3 = new Tarefa(3, 10, 40);
const tarefa4 = new Tarefa(4, 0, 20);
const roundRobin = new RoundRobin([tarefa4, tarefa1, tarefa3, tarefa2]);
roundRobin.executar();
// erro no ultimo loop, corrigir depois (implementa uma troca de contexto adicional na execução da ultima tarefa na memória)
