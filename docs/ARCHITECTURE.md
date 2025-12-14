Visão Arquitetural — Rimatur Backend
====================================

Resumo
------
O backend é uma API REST construída com NestJS (modular) e TypeORM conectando-se a um PostgreSQL. A arquitetura segue o padrão modular do NestJS:

- Módulos (Modules): agrupam controllers, providers e imports por responsabilidade (ex.: `auth`, `users`, `messages`, `routine`).
- Controllers: expõem endpoints HTTP e delegam a lógica para Services.
- Services (Providers): contêm a lógica de negócio.
- Entities: mapeamento de tabelas com TypeORM.
- DTOs: validação/shape de dados de entrada (recomendado usar `class-validator`).
- Migrations: versionamento de schema com TypeORM.

Design decisions
----------------
- Isolamento por módulo para facilitar manutenção e testes.
- TypeORM para persistência e migrations.
- Arquitetura preparada para introduzir autenticação JWT (hoje usa um token simples para protótipo).
- Configuração atual embutida em `src/app.module.ts` e `src/ormconfig.ts` (recomenda-se migrar para variáveis de ambiente `.env`).

Escalabilidade e melhorias
-------------------------
- Substituir o token simples por JWT com `@nestjs/jwt` e `Passport`.
- Externalizar configuração com `@nestjs/config` e `.env`.
- Adicionar rate-limiting, logging estruturado e monitoramento (Prometheus/Datadog).
- Adicionar testes de integração e E2E adicionais para cobertura de endpoints críticos.