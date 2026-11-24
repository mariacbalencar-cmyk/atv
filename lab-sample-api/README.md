# LabSample API

API para cadastrar, listar, consultar, atualizar e excluir amostras de laboratório usando Node.js, Express e armazenamento em memória.

## Instalação e execução

1. Abra a pasta do projeto no VS Code.
2. No terminal, execute:

```bash
npm install
```

3. Inicie o servidor:

```bash
node app.js
```

A API ficará disponível em `http://localhost:3001`.

**Importante:** os dados ficam em um array na memória. Ao reiniciar o servidor, as amostras cadastradas são apagadas.

## Rotas

| Método | Caminho | Ação |
|---|---|---|
| POST | `/amostras` | Cadastrar |
| GET | `/amostras` | Listar todas |
| GET | `/amostras/:indice` | Buscar pelo índice |
| DELETE | `/amostras/:indice` | Excluir pelo índice |
| PATCH | `/amostras/:indice` | Atualizar pelo índice |

## Exemplos para testar

Envie o cabeçalho `Content-Type: application/json` nos POST e PATCH.

### POST /amostras

Cadastre cada exemplo separadamente:

```json
{
  "codigo": "AM001",
  "material": "Aço",
  "origem": "Setor de Produção",
  "resultado": "Aprovado"
}
```

```json
{
  "codigo": "AM002",
  "material": "Plástico",
  "origem": "Setor de Embalagem",
  "resultado": "Em análise"
}
```

```json
{
  "codigo": "AM003",
  "material": "Alumínio",
  "origem": "Setor de Fundição",
  "resultado": "Reprovado"
}
```

### PATCH /amostras/0

O PATCH permite enviar somente o campo que deseja alterar:

```json
{
  "resultado": "Aprovado após nova análise"
}
```

Também é possível atualizar mais de um campo no mesmo PATCH.

## Sequência sugerida de testes

1. Faça os três POST.
2. Faça GET `/amostras`.
3. Faça GET `/amostras/0` e GET `/amostras/2`.
4. Faça DELETE `/amostras/1`.
5. Faça GET `/amostras` e confira que restaram duas amostras.
6. Faça GET `/amostras/10` para conferir o status 404.
7. Faça PATCH `/amostras/0` enviando um campo.
8. Faça GET `/amostras/0` para conferir a alteração.

Os índices começam em zero. Portanto, a primeira amostra fica no índice 0.

## Organização

- `model/Amostra.js`: classe Amostra.
- `repository/amostraRepository.js`: array e operações com os dados.
- `controller/amostraController.js`: recebe requisições e monta respostas.
- `routes/amostraRoutes.js`: define os caminhos HTTP.
- `app.js`: configura e inicia o Express.
