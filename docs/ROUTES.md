Rotas Principais — Rimatur Backend
=================================

Autenticação (públicas)
-----------------------
- POST /auth/register
  - body: { name, email, password }
  - retorna: { token, userId, name, email }

- POST /auth/login
  - body: { email, password }
  - retorna: { token, userId, name, email }

Usuários
--------
- POST /users
  - criar usuário
  - body: { name, email, password }

- GET /users
  - listar usuários

Mensagens
---------
- GET /messages?userId=1
  - busca inbox para `userId`

- GET /messages/history?userId=1&query=texto
  - busca histórico de conversas do usuário com filtro de texto

- POST /messages
  - criar nova mensagem
  - body: { senderId, receiverId, content }

- POST /messages/conversation/read
  - marcar conversa como lida
  - body: { userId, otherUserId }

- PATCH /messages/:id/read
  - marcar mensagem individual como lida

- POST /messages/mark-read
  - marcar múltiplas mensagens como lidas
  - body: { messageIds: [1,2,3] }

Rotinas (routine)
-----------------
- POST /routine
  - criar atividade
  - body: { title, description, userId, date, visibility, createdByRole }

- GET /routine?userId=1&date=2025-12-14
  - buscar atividades do usuário por data

- PATCH /routine/:id
  - atualizar atividade

- DELETE /routine/:id
  - deletar atividade

Observações
-----------
- Atualmente o token retornado é um token simples (string `token-{userId}`).
- Para proteger rotas, implemente JWT e `@UseGuards(JwtAuthGuard)` onde necessário.