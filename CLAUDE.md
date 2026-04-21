# Design Prototyping Kit — Claude Instructions

## Purpose
This repo is for creating UI prototypes for design review and stakeholder sharing.
Do not add backend logic, real API calls, or authentication. Use mock data only.

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4 for styling
- No state management library — useState and useContext only

## Folder Structure
- /components — shared core UI components, use these before creating new ones
- /screens — example assembled screens for reference
- /prototypes — each designer's prototypes live here
- /tokens — design tokens as CSS custom properties

## Components
All core components live in /components/[ComponentName]/[ComponentName].tsx
Import like: `import { Button } from '../../components/Button/Button'`
Always check /components before building something new.

## Prototypes
Each prototype lives in /prototypes/[designer-name]-[feature-name]/
Every prototype folder must contain:
- index.tsx — the entry point with a default export
- data.ts — all mock data
- README.md — a short description of what the prototype shows

## Design Tokens
Use Tailwind classes wherever possible.
For anything Tailwind doesn't cover, reference tokens from /tokens/tokens.css.
Never use raw hex values or pixel values outside the token system.

## Mock Data
Always create mock data in a data.ts file within the prototype folder.
Never fetch from real APIs. Never use real user data.

## Code Style
- Functional components only
- Props interfaces defined with TypeScript
- No inline styles — Tailwind classes only

## Storybook
Every component in /components must have a .stories.tsx file alongside it.
Stories must cover: all variants, all sizes, all interactive states, and disabled.
Run Storybook with: npm run storybook
