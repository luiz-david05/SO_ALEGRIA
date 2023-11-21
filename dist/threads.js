const threads = () => {
    console.log("Iniciando tarefa 1");
    console.log("Iniciando tarefa 2");
    let s = "";
    for (let i = 0; i < 10; i++) {
        s += "#";
        console.log("Executando", s, "Tarefa 1");
        console.log("Executando", s, "Tarefa 2");
    }
    console.log("Tarefas finalizadas!");
};
threads();
