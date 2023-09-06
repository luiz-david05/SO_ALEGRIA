with open("so_alegria.txt", "w", encoding="utf-8") as arquivo:
    so_alegria = arquivo.write("Só alegria hahaha")

    if not so_alegria:
        print("Erro ao criar arquivo")

    print("Arquivo criado com sucesso")