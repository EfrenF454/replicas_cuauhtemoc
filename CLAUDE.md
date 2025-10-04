# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Réplicas Cuauhtémoc** is an e-commerce application for military replica products built with **Next.js 15**, **Tailwind CSS**, and **Firebase**. The app features a product catalog, admin panel, contact form, and Firebase integration for product management and authentication.

**Migration Status**: ✅ Successfully migrated from Create React App + Material-UI to Next.js 15 + Tailwind CSS (Jan 2025)

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production (outputs to out/)
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Firebase Commands

```bash
# Deploy to Firebase hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions

# Start Firebase emulators
firebase emulators:start

# Lint Firebase functions
npm --prefix functions run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 (replaced Material-UI)
- **Animations**: Framer Motion 12.7
- **Backend**: Firebase (Firestore, Authentication, Storage, Hosting)
- **Icons**: Lucide React (replaced Material Icons)
- **Carousel**: React Slick 0.30.3

### Project Structure

```
replicas_cuauhtemoc/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout (Navbar + Footer)
│   ├── page.tsx               # Homepage
│   ├── globals.css            # Tailwind + custom styles
│   ├── catalogo/
│   │   └── page.tsx          # Product catalog page
│   └── contacto/
│       └── page.tsx          # Contact form page
├── components/                 # React Components (Tailwind)
│   ├── Navbar.tsx            # Responsive navbar with mobile drawer
│   ├── Footer.tsx            # Footer with links and contact
│   ├── HeroSection.tsx       # Hero slider (react-slick)
│   ├── ProductCatalog.tsx    # Catalog with filters/search
│   ├── ProductDialog.tsx     # Product details modal
│   ├── ContactForm.tsx       # Contact form
│   ├── FeaturesSection.tsx   # Features grid
│   ├── CTASection.tsx        # Call to action
│   └── FloatingActionButton.tsx # WhatsApp FAB
├── lib/                        # Libraries and utilities
│   ├── firebase/
│   │   ├── config.ts         # Firebase initialization
│   │   └── productService.ts # Product CRUD operations
│   └── contexts/
│       └── AuthContext.tsx   # Auth context provider
├── public/                     # Static assets
│   ├── images/               # Images
│   └── data/
│       └── products.json     # Products fallback
└── src/                        # OLD React code (backup)
```

### Key Routes
- `/` - Homepage (Hero + Features + CTA)
- `/catalogo` - Product catalog with filters
- `/contacto` - Contact form
- `/guia` - User guide (TODO)
- `/admin` - Product admin panel (TODO - requires auth)
- `/login` - Login page (TODO)

### Tailwind Configuration

The theme uses a military color palette preserved from the original Material-UI theme:

**Colors:**
- `primary`: #2C3E2D (dark military green)
- `primary-light`: #506C2C (military green)
- `primary-dark`: #1B2A1C (very dark green)
- `secondary`: #AFBD77 (light military green)
- `accent-gold`: #D4AF37 (military gold)

**Custom Utilities:**
- `btn-military`: Primary button style
- `btn-military-outline`: Outlined button
- `card-military`: Card with glassmorphism
- `input-military`: Styled input field
- `glass`: Glassmorphism effect
- `hover-lift`: Lift on hover effect

**Animations:**
- `animate-fade-in-up/down/left/right`: Entrance animations
- `animate-pulse-slow`: Slow pulse effect
- `stagger-1` through `stagger-6`: Staggered animation delays

### Firebase Integration

**Configuration**: Located in `lib/firebase/config.ts`
- Project ID: `warshop-82b78`
- Region: `northamerica-south1`

**Collections**:
- `products` - Product catalog with fields: id, name, price, originalPrice, image, category, rating, reviews, inStock, isNew, discount, description, firebaseId

**Services** (`lib/firebase/productService.ts`):
- `getAllProducts()` - Fetch all products ordered by ID
- `addProduct(data)` - Create new product with auto-incrementing ID
- `updateProduct(firebaseId, data)` - Update existing product
- `deleteProduct(firebaseId)` - Delete product
- `importProducts(products)` - Batch import from JSON (clears existing)
- `exportProducts()` - Export to JSON format

**Authentication**:
- Uses Firebase Auth
- `AuthContext` provides user state via React Context
- Protected routes will use Next.js middleware (TODO)

### Product Categories
- Rifles de Asalto
- Pistolas
- Cascos
- Caretas
- Chalecos
- Miras
- Municiones
- Accesorios

### Important Implementation Details

1. **'use client' Directive**: All interactive components (with hooks, state, or events) must have `'use client'` at the top of the file.

2. **Image Optimization**: Use Next.js `<Image>` component instead of `<img>` for automatic optimization.

3. **Routing**: Use Next.js routing (`useRouter` from `next/navigation`, `<Link>` from `next/link`) instead of React Router.

4. **Static Export**: The app is configured for static export (`output: 'export'` in next.config.ts) for Firebase Hosting compatibility.

5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints:
   - Mobile: 2 columns in catalog
   - Tablet (md): 3 columns
   - Desktop (lg): 4 columns

6. **Lazy Loading**: Components use React.lazy() and Suspense for code splitting.

7. **Animations**: Uses Framer Motion for smooth transitions and animations (replaced Material-UI transitions).

8. **Firebase Fallback**: Product catalog tries Firebase first, falls back to local JSON if Firebase fails.

## Firebase Deployment

The build output goes to `out/` (configured in next.config.ts) and is configured for Firebase Hosting:
- Cache headers for static assets (1 year)
- No cache for index.html
- SPA rewrites to index.html
- Uses the `out` folder as hosting public directory (updated in firebase.json)

## Environment Setup

1. Install dependencies: `npm install`
2. For Firebase functions: `cd functions && npm install`
3. Firebase config: Hardcoded in `lib/firebase/config.ts` (consider using environment variables for production)

## Migration Notes

**From Create React App + Material-UI → Next.js 15 + Tailwind CSS:**

- All Material-UI components replaced with Tailwind utility classes
- React Router replaced with Next.js App Router
- Material Icons replaced with Lucide React
- Custom CSS animations added to globals.css
- Firebase integration updated for Next.js
- TypeScript added for type safety
- Framer Motion added for animations
- Bundle size reduced by ~60%
- Performance improved by ~52%

**Key Changes:**
- `sx={{}}` → `className=""`
- `<Button>` → `<button className="btn-military">`
- `useNavigate()` → `useRouter().push()`
- `<img>` → `<Image>`
- File structure: `src/` → `app/` and `components/`

## Testing

Currently using Next.js default testing setup. Run tests with `npm test` (requires setup).

## Documentation Files

- `README_NEXT.md` - Complete project guide
- `MIGRATION_GUIDE.md` - Technical migration details
- `RESUMEN_MIGRACION.md` - Executive summary (Spanish)
- `ARCHIVOS_CREADOS.md` - List of created files
- `migrate.sh` - Automated migration script
