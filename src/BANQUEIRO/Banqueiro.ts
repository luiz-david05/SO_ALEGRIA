import { input } from "./utils.js";

class Processo {
    constructor(private _id: number, private _recursosNecessarios: number[], private _recursosAlocados: number[]) {}

    get id() {
        return this._id;
    }

    get recursosNecessarios() {
        return this._recursosNecessarios;
    }

    get recursosAlocados() {
        return this._recursosAlocados;
    }

    set recursosAlocados(novoRecurso) {
        this._recursosAlocados = novoRecurso;
    }

    set recursosNecessarios(novoRecurso) {
        this._recursosNecessarios = novoRecurso;
    }
}

function removerProcesso(processos: Processo[], processo: Processo): Processo[] {
    return processos.filter(p => p !== processo);
}


function verifica_recursos_pra_processo(recursos_alocados: number[], recursos_necessarios: number[], recursos_disponiveis: number[]): boolean {
    const quantidade_de_recursos = recursos_alocados.length
    let recursos_faltantes: number

    for (let i = 0; i < quantidade_de_recursos; i++) {   
        recursos_faltantes = recursos_necessarios[i] - recursos_alocados[i]

        if(recursos_faltantes > recursos_disponiveis[i]){
            return false;
        }
    }
    return true;
}


function adiciona_recursos_utilizados_ao_disponivel(recursos_alocados: number[], recursos_disponiveis: number[]) {
    const quantidade_de_recursos = recursos_alocados.length
    for (let i = 0; i < quantidade_de_recursos; i++) {   
        recursos_disponiveis[i] += recursos_alocados[i]
    }
}


async function algoritmo_do_banqueiro(processos: Processo[], recursos_disponiveis: number[]) {
    let copyProcessos: Processo[] = [...processos]

    console.log('Iniciando o algoritmo do banqueiro...')
    input('press enter to continue...')
    console.clear()

    while (processos.length != 0) {
        let processoFinalizado = false


        copyProcessos.forEach((processo) => {
            console.log(`Quantidade de processos atuais: ${processos.length}`)
            console.log(`Analisando o processo ${processo.id}\n`)

            const recursos_alocados = processo.recursosAlocados
            const recursos_necessarios = processo.recursosNecessarios

            console.log('Recursos disponíveis: ')
            console.log(recursos_disponiveis)
            console.log('Recursos alocados: ')
            console.log(recursos_alocados)
            console.log('Recursos necessários: ')
            console.log(recursos_necessarios)


            if (verifica_recursos_pra_processo(recursos_alocados, recursos_necessarios, recursos_disponiveis)) {
                adiciona_recursos_utilizados_ao_disponivel(recursos_alocados, recursos_disponiveis)

                processos = removerProcesso(processos, processo)
                processoFinalizado = true


                console.log(`\nProcesso ${processo.id} foi executado com sucesso`)  
            } else {
                console.log(`\nNão existem recursos suficientes para executar o processo ${processo.id}`)
            }

            input('press enter to continue...')
                console.clear()
        })

        copyProcessos = [...processos]


        if (!processoFinalizado) {
            console.log('Os recursos disponíveis não são suficientes para executar os processos')
            return false
        }
    }
    return true
}

async function main() {
    if( await algoritmo_do_banqueiro(processos, recursos_disponiveis1)) {
        console.log('\nRESULTADO: Estado Seguro.')
    } else {
        console.log('\nRESULTADO: Um deadlock será gerado.')
    }
}

// da certo
const recursos_disponiveis1 = [3, 1, 1, 2]


 const processo1 = new Processo(1, [3, 3, 2, 2], [1, 2, 2, 1])
 const processo2 = new Processo(2, [1, 2, 3, 4], [1, 0, 3, 3])
 const processo3 = new Processo(3, [1, 1, 5, 0], [1, 1, 1, 0])
 const processos = [processo1, processo2, processo3]




//deadlock -> nao da certo

//recursos disponiveis
// const recursos_disponiveis2 = [2, 1, 0, 0]

// recursos necessarios e recursos alocados
// const processo4 = new Processo(1, [2, 0, 0, 1], [0, 0, 1, 0])
// const processo5 = new Processo(2, [1, 0, 1, 0], [2, 0, 0, 1])
// const processo6 = new Processo(3, [2, 1, 0, 1], [0, 1, 2, 0])

// const processos2 = [processo4, processo5, processo6]

main()