# Frontend Architecture

## Layers

- `src/app`: application shell providers and top-level composition.
- `src/features`: feature/domain entry points for routed experiences.
- `src/shared`: reusable cross-cutting modules:
  - `api`: request helper and API access barrel.
  - `ui`: reusable UI primitives and wrappers.
  - `types`: shared TypeScript entities.

## Routing

- `src/App.jsx` owns route composition.
- Routes use feature-level page entry points (`src/features/**/**Page.jsx`) so pages can be migrated incrementally without breaking URLs.

## Data and Networking

- `src/services/apiClient.js` remains the HTTP client with interceptors.
- `src/shared/api/request.js` normalizes success/error handling.
- `src/app/providers/QueryProvider.jsx` provides TanStack Query defaults for gradual migration of server-state reads.

## Styling System

- Tailwind remains the primary styling layer with semantic tokens from `tailwind.config.js`.
- Reusable visual patterns are centralized under `src/shared/ui`.
- Existing MUI usage is retained for compatibility and can be migrated behind `shared/ui` wrappers incrementally.

