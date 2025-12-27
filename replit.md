# replit.md

## Overview

A romantic anniversary tracker and daily message application built for a couple. The app displays a real-time counter showing how long the couple has been together (since December 31, 2024), along with a daily inspirational message. The interface features a luxury dark theme with gold accents, designed as a personal gift/memento. Content is displayed in Russian language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom luxury dark theme (gold accents on deep charcoal)
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions and entry animations
- **Date Utilities**: date-fns for time calculations and formatting
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: REST endpoints defined in shared routes file with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL
- **Schema**: Single `messages` table with id, content, and display_date (unique per date)
- **Migrations**: Drizzle Kit for schema management (`db:push` command)
- **Connection**: pg Pool with DATABASE_URL environment variable

### API Structure
- `GET /api/messages/today` - Fetch message for current date (Berlin timezone)
- `POST /api/messages` - Create a new scheduled message
- `GET /api/messages` - List all messages

### Key Design Decisions
1. **Shared Schema**: Database schema and API route definitions live in `/shared/` for type safety across client and server
2. **Timezone Handling**: All date calculations use Europe/Berlin timezone for consistency
3. **No Authentication**: This is a personal app, admin page is unprotected (accessible at /admin)
4. **Monorepo Structure**: Client in `/client/`, server in `/server/`, shared types in `/shared/`

## External Dependencies

### Database
- PostgreSQL (required, connection via DATABASE_URL environment variable)
- connect-pg-simple for session storage capability

### Third-Party Libraries
- **@radix-ui/***: Headless UI primitives for accessible components
- **@tanstack/react-query**: Server state management
- **drizzle-orm + drizzle-zod**: Type-safe ORM with Zod schema generation
- **framer-motion**: Animation library
- **lucide-react**: Icon set
- **zod**: Runtime type validation for API inputs/outputs
- **embla-carousel-react**: Carousel functionality
- **vaul**: Drawer component primitive
- **cmdk**: Command menu component

### Development Tools
- Vite with Replit-specific plugins (runtime error overlay, cartographer, dev banner)
- esbuild for server bundling in production
- TypeScript with strict mode