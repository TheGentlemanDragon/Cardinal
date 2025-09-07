# Cardinal

Cardinal is a Preact-based web application for creating and managing card designs with templates.

## Development Commands

- `npm run dev` - Start development server at http://localhost:5173/
- `npm run build` - Build for production to `dist/`
- `npm run preview` - Preview production build at http://localhost:4173/
- `npm run push` - Deploy to production server (runs build + rsync to fuchikoma:/volume1/docker/pocketbase/public)

## Architecture Overview

- **Frontend**: Preact with TypeScript, Vite build system, TailwindCSS + DaisyUI for styling
- **Backend**: PocketBase for database and API
- **State Management**: Preact Signals for reactive state, TanStack Query for server state
- **Routing**: preact-iso for client-side routing

### Core Data Models

- **Project**: Top-level container for organizing templates and cards
- **Template**: Design blueprint with elements and fields, belongs to a project
- **Card**: Instance of a template with specific data values
- **Element**: UI component with positioning, styling, and content properties

### Key Directories

- `src/lib/` - Core business logic, types, utilities, and database configuration
- `src/pages/` - Route components (Splash, Projects, Editor, etc.)
- `src/features/` - Feature-specific components organized by domain
- `src/components/` - Shared UI components (Modal, Page, EmptyState, etc.)
- `src/icons/` - Custom icon components

### State Management Patterns

- Global editor state managed through `src/lib/editor.ts` signals:
  - `editorView` - Current editor view (template/properties)
  - `element` - Currently selected element
  - `template` - Active template being edited
- Server state managed via TanStack Query with PocketBase integration
- Path aliases: `$lib`, `$components`, `$assets` for clean imports

### Database Integration

- PocketBase client configured in `src/lib/db.ts` with retry logic and error handling
- Environment variable `VITE_DB_URL` required for database connection
- Custom error handling for 404s and retry strategies for failed requests
- Zod schemas in `src/lib/types.ts` for runtime type validation

### Editor Architecture

The editor is a visual design tool for creating templates:

- Element positioning with absolute coordinates
- Properties panel for styling and content editing
- Template management with element hierarchy
- Real-time preview of design changes

### Styling System

- TailwindCSS v4 with DaisyUI components
- Custom utility classes in `src/lib/styles.ts`
- Responsive design patterns throughout
- CSS custom properties for theme variables
