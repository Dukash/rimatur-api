Rimatur — Backend API
======================

API REST desenvolvida em NestJS para gerenciamento de usuários, mensagens e rotinas.

Principais tecnologias: NestJS · TypeScript · TypeORM · PostgreSQL

Índice

- Visão geral
- Principais comandos
- Rodando localmente
- Estrutura do projeto
- Rotas principais
- Autenticação
- Dicas de desenvolvimento
- Troubleshooting

Visão geral
------------
Backend da plataforma Rimatur. Responsável por autenticação simples, gerenciamento de usuários, mensagens e rotinas. API REST com TypeORM + PostgreSQL.

Principais comandos
-------------------
```bash
npm install
npm run start:dev   # desenvolvimento (watch)
npm run build       # build de produção
npm run start       # start em produção
npm run test        # executar testes
npm run lint        # linting
npm run migration:run  # rodar migrations
```

Rodando localmente
-------------------
1. Instale dependências:

```bash
npm install
```

2. Crie um banco PostgreSQL (exemplo):

```sql
-- conecte com o psql como um usuário com permissão
CREATE DATABASE rimatur_messages;
```

3. Configuração (projeto usa valores padrão no código):

Por padrão o projeto está configurado para se conectar a:

- host: `localhost`
- port: `5432`
- username: `your_db_user`
- password: `your_db_password`
- database: `rimatur_messages`

Esses valores estão definidos em `src/app.module.ts` e `src/ormconfig.ts` — altere-os conforme necessário.

4. Start em modo desenvolvimento:

```bash
npm run start:dev
```

API disponível em http://localhost:3001

Estrutura do projeto
--------------------
```
rimatur-api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── auth/              # autenticação (login/register)
│   ├── users/             # usuários
│   ├── messages/          # mensagens
│   ├── routine/           # rotinas/atividades
│   └── common/
├── migrations/
├── test/
└── package.json
```

Rotas principais
-----------------
Autenticação (públicas)

POST /auth/register      # registrar novo usuário
POST /auth/login         # fazer login (retorna token simples)

Usuários

POST /users              # criar usuário
GET  /users              # listar usuários

Mensagens

GET  /messages                  # caixa de entrada (query `userId`)
GET  /messages/history          # histórico de conversas (query `userId`, `query`)
POST /messages                  # criar mensagem
POST /messages/conversation/read # marcar conversa como lida (body: userId, otherUserId)
PATCH /messages/:id/read        # marcar mensagem como lida
POST /messages/mark-read        # marcar múltiplas mensagens como lidas (body: { messageIds: [] })

Rotinas (autenticadas em melhorias futuras)

POST   /routine         # criar atividade
GET    /routine         # buscar por `userId` e `date` (query)
PATCH  /routine/:id     # atualizar atividade
DELETE /routine/:id     # deletar atividade

Autenticação
-------------
O `POST /auth/login` e `POST /auth/register` retornam um token simples no formato `token-{userId}` (implementação simples no serviço atual).

Envie o token no header `Authorization: Bearer {token}` quando implementar proteção nas rotas.

Observação: hoje não há guards JWT aplicados automaticamente — é recomendado migrar para JWT e `@UseGuards(...)` para proteger rotas.

Dicas de desenvolvimento
------------------------
- Modular: cada feature em sua pasta (`auth/`, `users/`, `messages/`, `routine/`).
- Services: lógica de negócio centralizada nos serviços.
- DTOs: usar `class-validator` para validação de entrada (recomendado).
- Migrations: versionamento de schema com TypeORM (use `npm run migration:generate` e `npm run migration:run`).

Exemplo de controller (trecho):

```typescript
@Controller('messages')
export class MessagesController {
  @Get()
  findInbox(@Query('userId') userId: string) {
    return this.messagesService.findInbox(Number(userId));
  }
}
```

Troubleshooting
---------------
Problema — Solução
- Porta 3001 em uso — Alterar porta em `src/main.ts` (arquivo) ou encerrar processo.
- PostgreSQL não conecta — Verificar credenciais em `src/app.module.ts` / `src/ormconfig.ts` e se o serviço PostgreSQL está em execução.
- Migrations falhando — Recriar banco: `DROP DATABASE rimatur_messages; CREATE DATABASE rimatur_messages;` e rodar `npm run migration:run`.
- Token inválido — O token atual é simples; ao migrar para JWT, atualize `auth` para validar o `Authorization` header.

Última atualização: Dezembro 2025
