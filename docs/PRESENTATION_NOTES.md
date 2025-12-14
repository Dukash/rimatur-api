Notas para Apresentação
======================

Pontos-chave
------------
- Tech stack: NestJS, TypeScript, TypeORM, PostgreSQL.
- Funcionalidades: autenticação (login/register), gerenciamento de usuários, mensagens (inbox/histórico), rotinas/atividades.
- Endpoints principais disponíveis em `docs/ROUTES.md`.

Demonstração rápida
------------------
1. Rodar `npm install` e `npm run start:dev`.
2. Registrar um usuário via `POST /auth/register`.
3. Fazer login via `POST /auth/login` e observar o token retornado.
4. Criar mensagens e buscar histórico com `GET /messages` e `GET /messages/history`.

Próximos passos a mencionar
--------------------------
- Migração para JWT e proteção de rotas com Guards.
- Adição de validação com `class-validator` nos DTOs.
- Melhorar logging e monitoramento.

Tempo estimado para implementação das melhorias: 1-2 semanas (dependendo do escopo).