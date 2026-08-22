# Shooyande Sabz

A modern Persian RTL e-commerce application built with **Next.js, React, and TypeScript**.

Shooyande Sabz includes a customer-facing storefront and an administration dashboard, with a local `json-server` API for portfolio and development purposes.

> **Portfolio project:** The repository is configured for local development and demonstration. Production deployments should use a real backend and persistent database.

## ✨ Features

### Storefront
- Product listing with search, filtering, sorting, and pagination
- Product details and reviews
- Shopping cart and wishlist
- Authentication and account pages
- Responsive Persian RTL interface
- Loading, error, and empty states

### Admin Dashboard
- Dashboard overview and reports
- Product and category management
- Customer and order management
- Discounts and promotional content
- Messages and blog content management
- Protected dashboard routes

### Engineering
- Server/client architecture with Next.js App Router
- TanStack Query for server-state management
- React Hook Form + Zod for form handling and validation
- Auth.js for authentication
- Tailwind CSS for styling
- Framer Motion for animations
- Optional Sentry monitoring
- Optional Upstash Redis rate limiting
- Optional Cloudinary uploads

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | Application framework |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| TanStack Query | Server-state and caching |
| React Hook Form | Form management |
| Zod | Validation |
| Auth.js | Authentication |
| Framer Motion | Animations |
| Recharts | Dashboard charts |
| Lucide React | Icons |
| Sonner | Toast notifications |
| json-server | Local development API |

## 📋 Requirements

Before running the project, make sure you have:

- **Node.js 20+**
- **npm 10+**

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd shooyande-sabz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

Copy the example environment file:

**Windows PowerShell**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux**

```bash
cp .env.example .env.local
```

Then open `.env.local` and set your values.

For a local demo, the minimum configuration is:

```env
API_URL=http://localhost:4000
AUTH_SECRET=your-private-random-secret
```

Generate a new secret for your own environment. **Never commit `.env.local`, API tokens, authentication secrets, or other credentials to GitHub.**

### 4. Start the project

The easiest option is to start both the Next.js application and the local API together:

```bash
npm run dev:all
```

The application will be available at:

```text
http://localhost:3000
```

The local API runs at:

```text
http://localhost:4000
```

### 5. Run the services separately

Next.js only:

```bash
npm run dev
```

Local API only:

```bash
npm run api
```

## 🔐 Environment Variables

Use `.env.example` as the template for `.env.local`.

| Variable | Required | Description |
| --- | --- | --- |
| `API_URL` | Yes | Base URL for the local or custom API |
| `AUTH_SECRET` | Yes | Secret used by Auth.js |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis authentication token |
| `SENTRY_DSN` | No | Server-side Sentry DSN |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Client-side Sentry DSN |
| `SENTRY_ORG` | No | Sentry organization |
| `SENTRY_PROJECT` | No | Sentry project |
| `SENTRY_AUTH_TOKEN` | No | Sentry build authentication token |
| `CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name |
| `CLOUDINARY_UPLOAD_PRESET` | No | Cloudinary upload preset |

Optional services can remain empty during local development unless the related feature is required.

## 🗄 Local API

The project includes `db.json` as local development data and uses `json-server` as a lightweight REST API.

Start it with:

```bash
npm run api
```

The API is bound to `127.0.0.1:4000` by default.

For a production application, replace `json-server` with a real backend, database, authentication provider, and persistent file storage.

## 📁 Project Structure

```text
src/
├── app/                    Next.js routes, layouts and route handlers
├── components/             Shared UI components
├── features/               Domain-focused application modules
├── lib/                    Shared utilities, HTTP, security and storage
├── types/                  Shared TypeScript declarations
├── auth.ts                 Auth.js configuration
├── proxy.ts                Request and route orchestration
└── instrumentation*.ts     Runtime instrumentation

public/
└── images/                 Static assets

db.json                     Local development data
.env.example                Environment variable template
```

The `features` directory keeps related domain logic together, making it easier to maintain API functions, hooks, components, validation, types, and query logic within each feature.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run api` | Start `json-server` on port `4000` |
| `npm run dev:all` | Start Next.js and `json-server` together |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |

## 🧪 Production Build

Before deploying, run:

```bash
npm run lint
npm run build
npm start
```

The production server will use the environment variables configured by your hosting provider.

## ☁️ Deployment Notes

For deployment, configure environment variables in your hosting platform instead of uploading `.env.local`.

The bundled `json-server` setup is intended for development and portfolio demonstrations. A production version should use a persistent backend and database.

Sentry, Upstash Redis, and Cloudinary are optional integrations and only need to be configured when those services are used.

## 🔒 GitHub Safety

Before pushing the repository, verify that:

- `.env.local` is not tracked
- No real API keys or authentication secrets exist in the repository
- `node_modules` and `.next` are not committed
- `*.tsbuildinfo` files are not committed
- `.env.example` contains placeholders only

The repository `.gitignore` already excludes common local, build, and environment files.

## 📄 License

This project is intended for portfolio and educational use.

## 👤 Author

**Mohamadreza Abidi**

Frontend developer and creator of this project.
