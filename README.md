# Milliarium

A modern Kanban/task management app built with Next.js, Supabase, and Tailwind CSS.

## Features
- User authentication (login/signup)
- Kanban board for task management
- Supabase backend integration
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/MoazMustafa-stack/milliarium.git
   cd milliarium
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `app/` — Next.js app directory
- `components/` — React components (Kanban, TaskCard, etc.)
- `lib/` — Supabase client setup
- `supabase/` — Database migrations and SQL

## Security
- **Never commit your `.env` or secret files.**
- All sensitive keys should be stored in environment variables (see `.gitignore`).

## License
MIT
