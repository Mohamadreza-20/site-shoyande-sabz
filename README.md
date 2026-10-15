# Shooyande Sabz

<p align="center">
  <strong>Modern Persian E-Commerce Dashboard & Storefront</strong>
  <br />
  A production-oriented Next.js portfolio project focused on architecture, UX, authentication, server state, and an admin dashboard.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Auth.js-5-7C3AED?style=flat-square" alt="Auth.js" />
</p>

---

## Overview

**Shooyande Sabz** is a Persian, RTL e-commerce application built as a **frontend portfolio project** with Next.js App Router and TypeScript.

The project goes beyond a simple product listing. It includes a storefront, authentication, account area, cart and wishlist flows, blog, contact forms, and a full admin dashboard with product, order, customer, discount, message, report, and settings sections.

The application is intentionally structured so that the frontend can be evaluated independently from the backend implementation. During local development, the project uses **`json-server` as a demo REST API** through the `db.json` file.

> **Portfolio note:** `json-server` is included to make the repository easy to run locally. It is a development/demo data source, not the intended production backend architecture.

---

## What this project demonstrates

- Modern **Next.js App Router** architecture
- Practical **Server Component / Client Component** boundaries
- Feature-based project organization
- Type-safe API and domain models with TypeScript
- Server-state management with TanStack Query
- Form management and schema validation
- Auth.js session-based authentication
- Protected dashboard and account routes
- CRUD-oriented admin UI
- Responsive RTL UI for Persian users
- Image optimization with `next/image`, AVIF and WebP
- Reusable UI primitives, dialogs, tables, pagination and notifications
- Rate-limiting and security-oriented API utilities
- Error monitoring integration with Sentry
- Smooth navigation and pagination scroll behavior

---

## Features

### Storefront

- Product listing and product detail pages
- Search and filtering
- Category-based browsing
- Product availability and inventory state
- Product wishlist
- Shopping cart with quantity controls
- Discount code support
- Order total and discount calculations
- Responsive product cards and layouts
- Smooth scroll-to-top behavior on route and pagination changes

### Authentication & Account

- Sign in and registration flows
- Auth.js integration
- Session-aware UI
- Protected account pages
- Protected dashboard routes
- Account information management

### Admin Dashboard

- Overview dashboard
- Reports and charts
- Product management
- Category management
- Order management
- Customer management
- Discount management
- Message management
- Blog/article management
- Settings
- Product image upload, replacement, and deletion

### Image Handling

- Optimized images through `next/image`
- AVIF and WebP support
- Responsive image sizing
- Cloudinary integration for product uploads
- Validation of uploaded image types

### UX & UI

- Persian RTL layout
- Fully responsive interface
- Framer Motion animations
- Loading and error states
- Toast notifications with Sonner
- Reusable modals and UI components
- Keyboard-friendly interactions
- Smooth scroll-to-top navigation

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | App framework, routing and rendering |
| **React 19** | UI layer |
| **TypeScript** | Static typing |
| **Tailwind CSS 4** | Styling and responsive design |
| **TanStack Query** | Server state, caching and mutations |
| **React Hook Form** | Form state management |
| **Zod** | Validation and schemas |
| **Auth.js** | Authentication and sessions |
| **Framer Motion** | UI animations |
| **Recharts** | Dashboard charts |
| **Lucide React** | Icons |
| **Sonner** | Notifications |
| **Cloudinary** | Image storage/upload |
| **Upstash Redis** | Rate limiting |
| **Sentry** | Error monitoring |
| **json-server** | Local demo REST API |

---

## Architecture

The application follows a **feature-based architecture** instead of grouping everything by technical type alone.

```text
src/
├── app/                         # Next.js routes and layouts
│   ├── api/                     # Route handlers / API proxy layer
│   ├── products/                # Storefront product routes
│   ├── account/                 # Account area
│   ├── auth/                    # Authentication routes
│   ├── blog/                    # Blog routes
│   ├── cart/                    # Cart routes
│   ├── contact/                 # Contact route
│   └── dashboard/               # Admin routes
│
├── components/                  # Shared UI and global components
│   ├── ui/
│   ├── motion/
│   └── providers/
│
├── features/                    # Domain/feature modules
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── customers/
│   ├── discounts/
│   ├── messages/
│   ├── dashboard/
│   ├── account/
│   └── blog/
│
├── lib/                         # HTTP, security, storage and utilities
├── types/                       # Shared TypeScript types
├── auth.ts                      # Auth.js configuration
└── proxy.ts                     # Request/security orchestration
```

### Server / Client boundary

Interactive behavior stays in Client Components, while static and data-oriented parts are kept server-side where practical. This keeps browser-only concerns close to the components that actually need them.

### State management

- **Server state:** TanStack Query
- **Form state:** React Hook Form
- **Validation:** Zod
- **Authentication state:** Auth.js/session
- **UI state:** local React state and focused reducers where appropriate

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd shooyande-sabz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Copy `.env.example` to `.env.local`.

**macOS / Linux:**

```bash
cp .env.example .env.local
```

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

Then fill in the required values as described below.

### 4. Start the demo API

```bash
npm run api
```

This starts `json-server` using `db.json` at:

```text
http://localhost:4000
```

### 5. Start Next.js

In another terminal:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Or run both together

```bash
npm run dev:all
```

---

## Environment Variables

The repository includes `.env.example` so the project can be configured without exposing secrets.

### Required for the local demo

```env
API_URL=http://localhost:4000
AUTH_SECRET=replace-with-a-long-random-secret
```

#### `API_URL`

Base URL of the REST API used by the application.

For the included local demo:

```env
API_URL=http://localhost:4000
```

You can point it to another backend that exposes the same API shape.

#### `AUTH_SECRET`

Secret used by Auth.js for signing/encryption-related authentication data.

Generate a strong random value for real environments. **Never commit the real value to Git.**

---

### Optional: Upstash Redis

Used by the project's rate-limiting/security layer.

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

For local demo usage, these values can remain empty unless the corresponding production/security flow is required.

---

### Optional: Sentry

Used for error monitoring and production diagnostics.

```env
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

Sentry configuration is optional for local development. It becomes useful when deploying the project to a real production environment.

---

### Optional/required for real image uploads: Cloudinary

Product image uploads use Cloudinary.

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=
```

If you want to test actual image uploads, configure these values with your Cloudinary project.

---

### Complete `.env.local` example

```env
API_URL=http://localhost:4000

AUTH_SECRET=replace-with-a-long-random-secret

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=
```

> `.env.local` is ignored by Git. Do not replace the placeholders in `.env.example` with real credentials before committing the repository.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js development server |
| `npm run api` | Start local `json-server` API on port 4000 |
| `npm run dev:all` | Start Next.js and `json-server` together |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Start the production server after build |

---

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/products` | Product listing |
| `/products/[id]` | Product details |
| `/cart` | Shopping cart |
| `/auth` | Authentication |
| `/account` | User account |
| `/blog` | Blog |
| `/contact` | Contact page |
| `/dashboard` | Admin dashboard |
| `/dashboard/products` | Product management |
| `/dashboard/orders` | Order management |
| `/dashboard/users` | Customer management |
| `/dashboard/categories` | Category management |
| `/dashboard/discounts` | Discount management |
| `/dashboard/messages` | Message management |
| `/dashboard/blog` | Article management |
| `/dashboard/reports` | Reports and analytics |
| `/dashboard/settings` | Dashboard settings |

---

## Security Notes

The repository contains application-level security concerns such as authentication checks, protected dashboard access, validation, and rate-limiting utilities.

For a real production deployment:

1. Replace `json-server` with a real backend/database service.
2. Store secrets only in the deployment platform's environment/secret manager.
3. Configure Upstash Redis for production rate limiting.
4. Configure Sentry for monitoring.
5. Configure Cloudinary for persistent image storage.
6. Review CORS, authorization, API validation, logging, and database security on the real backend.

The included `json-server` setup is intentionally for **portfolio/demo development** and should not be treated as a production database or authorization boundary.

---

## Screenshots / Demo

For the GitHub repository, add a few screenshots here to make the project immediately understandable to visitors.

Recommended screenshots:

- Home page
- Product listing + filters
- Product detail
- Cart
- Login/Register
- Dashboard overview
- Product management
- Orders / reports

Example section:

```md
![Home](./docs/screenshots/home.png)
![Products](./docs/screenshots/products.png)
![Dashboard](./docs/screenshots/dashboard.png)
```

---

## Portfolio Highlights

This project is designed to demonstrate more than visual implementation. The main focus areas are:

- scalable frontend architecture
- reusable components and feature modules
- server/client separation in the App Router
- type-safe data flows
- authentication and route protection
- API abstraction and service organization
- caching and server-state management
- responsive RTL experience
- image optimization
- reusable dashboard patterns
- production-minded configuration

---

## Project Status

**Status: Portfolio-ready frontend demo**

The storefront and dashboard are designed to be run locally with the included demo API. The backend layer can later be replaced by a dedicated API and database without requiring the UI architecture to be rebuilt from scratch.

---

## Author

**Mohamadreza Obaidi**  
Frontend Developer — React · Next.js · TypeScript

---

## License

This repository is presented as a personal portfolio project. Educational use and code study are welcome; re-publishing the complete project as your own work is not permitted without permission from the author.
