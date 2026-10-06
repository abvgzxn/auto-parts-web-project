<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Auto Parts Web Project — Codex Instructions

## Project purpose

This repository is an educational project for building a modern website for an auto-parts store.

The project has two goals:

1. Build a real, production-quality website for an auto-parts business.
2. Teach the developer modern frontend and full-stack development through practical work.

The initial version will be a business website.

In the future, the project may evolve into an online store with approximately 5,000 products and integration with 1C for product data, prices, and inventory.

## Developer context

The developer is learning frontend development.

Do not treat this repository as a project where the goal is simply to generate as much code as possible.

The developer should understand the code being added.

When introducing:
- a new framework feature,
- architectural pattern,
- library,
- complex TypeScript construct,
- server-side concept,
- infrastructure component,

briefly explain why it is needed.

Prefer simple and idiomatic solutions over clever abstractions.

## Planned technology direction

The project is expected to use:

- Next.js
- React
- TypeScript
- App Router
- ESLint
- Tailwind CSS
- Git / GitHub

Additional technologies should be introduced only when there is a clear reason.

Do not add large dependencies without explaining why they are necessary.

## Coding principles

Use:

- TypeScript instead of JavaScript where appropriate
- React Server Components by default when appropriate
- Client Components only when client-side behavior is required
- semantic HTML
- accessible UI
- responsive design
- clear component boundaries
- meaningful names
- simple project structure

Avoid:

- unnecessary abstractions
- premature optimization
- excessive dependencies
- giant components
- duplicated code
- unexplained generated code

## Next.js

Follow current stable Next.js conventions.

Prefer the App Router.

Do not use legacy Pages Router patterns unless there is a specific reason.

Keep server/client boundaries explicit.

Do not add `"use client"` unless the component actually needs client-side functionality.

## Working with the repository

Before making significant changes:

1. Inspect the relevant existing files.
2. Understand the current project structure.
3. Check whether the requested functionality already exists.
4. Prefer modifying existing code over creating duplicate implementations.

For substantial tasks, explain the intended approach before changing many files.

After changes, when applicable, run relevant checks such as:

- lint
- TypeScript checks
- tests
- build

Do not claim that something works unless it has been verified or clearly state that it has not been verified.

## Git

Do not commit or push changes unless explicitly requested.

Do not rewrite Git history unless explicitly requested.

Keep changes focused on the current task.

Suggested commit prefixes:

- feat:
- fix:
- refactor:
- docs:
- test:
- chore:

## Learning mode

For small educational tasks, prefer guiding the developer instead of immediately writing the entire solution.

When the developer is expected to practice a concept:

1. Explain the goal.
2. Point to the relevant files.
3. Give hints or a small example if necessary.
4. Let the developer attempt the implementation.
5. Review the result.

For repetitive, mechanical, configuration-heavy, or debugging tasks, Codex may perform the changes directly.

## Future architecture

The project may later include:

- product catalog
- search and filtering
- product pages
- shopping cart
- checkout
- online payments
- customer accounts
- order management
- SEO
- database
- backend/API
- 1C integration
- approximately 5,000 products

Do not implement this future architecture prematurely.

The current architecture should remain simple enough to evolve toward these features later.

## AI experimentation

This repository is also intended for learning AI-assisted software development.

We may experiment with:

- Codex
- agent workflows
- subagents
- coding harnesses
- automated code review
- testing agents
- documentation agents

AI tooling should improve development and learning rather than hide how the application works.