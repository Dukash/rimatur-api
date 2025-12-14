Setup e Execução
=================

Pré-requisitos
--------------
- Node.js (versão recomendada >= 18)
- PostgreSQL rodando localmente

Instalação
---------
1. Instale dependências:

```bash
npm install
```

2. Configure o banco de dados (ex.: `rimatur_messages`) e credenciais conforme `src/app.module.ts` ou crie um `.env` (recomendado).

3. Rodar migrations (se houver):

```bash
npm run migration:run
```

Execução
--------
- Desenvolvimento (watch):

```bash
npm run start:dev
```

- Produção:

```bash
npm run build
npm run start
```

Testes
------
- Executar testes unitários:

```bash
npm run test
```

Boas práticas
------------
- Preferir variáveis de ambiente ao invés de hardcodes em `src/app.module.ts` e `src/ormconfig.ts`.
- Adicionar `.env.example` com os valores esperados e manter segredos fora do repositório.