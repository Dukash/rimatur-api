Componentes Principais
======================

Controllers
-----------
- `AuthController` — endpoints de login e registro.
- `UsersController` — criar/listar usuários.
- `MessagesController` — enviar mensagens, marcar lidas, histórico.
- `RoutineController` — CRUD para rotinas/atividades.

Services
--------
- `AuthService` — lógica de autenticação (login/register). Atualmente retorna um token simples no formato `token-{userId}`.
- `UsersService` — CRUD de usuários.
- `MessagesService` — lógica de mensagens (criação, leitura, busca, marcação como lida).
- `RoutineService` — lógica de rotinas/atividades.

Entities
--------
- `User` — dados do usuário (id, name, email, password, role, etc.).
- `Message` — remetente, destinatário, conteúdo, status (lida/nao lida), timestamps.
- `RoutineActivity` — atividades, usuário, data, status.

Outros
-----
- DTOs para validação de payloads (recomenda-se adicionar `class-validator` se ainda não estiver).
- Guards, interceptors e pipes podem ser adicionados no diretório `common/` para cross-cutting concerns.
- Migrations: scripts TypeORM em `migrations/`.

Notas
-----
- Manter a lógica de negócio nos Services, deixando Controllers finos.
- Preferir injeção de dependências e interfaces para facilitar testes e mocks.