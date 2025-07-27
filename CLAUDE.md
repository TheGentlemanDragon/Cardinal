# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server at http://localhost:5173/
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build at http://localhost:4173/

## Architecture Overview

This is a Preact + TypeScript application using PocketBase as the backend database. The project follows a feature-based architecture:

### Tech Stack

- **Frontend**: Preact with TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI v5
- **Build Tool**: Vite (using rolldown-vite)
- **Database**: PocketBase (local instance at http://127.0.0.1:8090/)
- **State Management**: @preact/signals + @tanstack/react-query
- **Routing**: preact-iso

### Project Structure

- `src/components/` - Reusable UI components (Modal, Page, QueryStatus, etc.)
- `src/features/` - Feature-specific components organized by domain:
  - `editor/` - Card editor functionality
  - `projects/` - Project management
  - `templates/` - Template system
- `src/pages/` - Route-level page components
- `src/lib/` - Core utilities and configuration:
  - `db.ts` - PocketBase client and query utilities
  - `config.ts` - Environment configuration (copy from `config.example.ts`)
- `_old/` - Legacy React implementation (reference only)

### Key Patterns

- Uses TypeScript path aliases: `$lib`, `$components`, `$icons`, `$assets`
- PocketBase integration with retry logic and 404 error handling
- React Query for server state management with custom error handling
- Feature-based component organization with index.ts barrel exports

### Configuration

- Copy `src/lib/config.example.ts` to `src/lib/config.ts` for local development
- PocketBase database URL defaults to http://127.0.0.1:8090/
- Uses ESLint with preact configuration

### Database Schema

- Schema reference available in `schemas/pb_schema.json`
- Template data format in `schemas/Template 0.csv`
