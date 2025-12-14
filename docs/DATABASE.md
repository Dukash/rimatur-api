Banco de Dados
===============

Visão geral
-----------
O projeto utiliza PostgreSQL com TypeORM. As configurações de conexão estão atualmente em `src/app.module.ts` e `src/ormconfig.ts`.

Esquema principal
-----------------
Tabelas comuns no projeto:

- `users` — id, name, email, password, role, createdAt, updatedAt
- `messages` — id, senderId, receiverId, content, read, createdAt
- `routine_activities` — id, title, description, userId, date, status, createdBy

Migrations
----------
- Use `npm run migration:generate` para gerar uma migration a partir das entidades.
- Execute `npm run migration:run` para aplicar migrations.

Conexão e credenciais
---------------------
Por padrão o projeto está configurado para conectar em:

- host: `localhost`
- port: `5432`
- username: `pyour_db_user`
- password: `your_db_password`
- database: `rimatur_messages`

postgresql://<USER>:<PASSWORD>@localhost:5432/rimatur_messages

Backup e restauração
--------------------
- Use `pg_dump` / `pg_restore` para backup/restauração.

Boas práticas
------------
- Nunca comitar credenciais no repositório.
- Usar migrations ao invés de `synchronize: true` em produção.
- Rodar testes e migrations em um ambiente isolado antes de deployar.