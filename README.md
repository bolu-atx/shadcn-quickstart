# Shadcn Admin Dashboard Starter

A modern, feature-rich admin dashboard starter template built with Shadcn UI and Vite. This template provides a solid foundation for building responsive and accessible admin interfaces with a comprehensive set of pre-built components and pages.

![Shadcn Admin Dashboard](public/images/shadcn-admin.png)

## Features

- 🌗 **Light/Dark Mode** - Built-in theme switching
- 📱 **Responsive Design** - Works seamlessly on all devices
- ♿ **Accessible** - WCAG compliant components
- 🧭 **Sidebar Navigation** - Collapsible sidebar with nested menus
- 🔍 **Global Search** - Command palette for quick navigation
- 📄 **10+ Pre-built Pages** - Ready-to-use dashboard pages
- 🎨 **Custom Components** - Extended component library
- 🌐 **RTL Support** - Right-to-left language support

## Tech Stack

- **UI Framework:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [TanStack Router](https://tanstack.com/router/latest)
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons)

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm installed
- Basic knowledge of React and TypeScript

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd shadcn-quickstart
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization Guide

### 1. Branding & Theme

#### Update App Name and Logo

**Edit the HTML title:**
```typescript
// index.html
<title>Your App Name</title>
```

**Replace the logo:**
- Replace the logo file in `src/assets/logo.tsx` with your own SVG component
- Update references in `src/components/layout/header.tsx`

#### Customize Colors

Edit your theme colors in `src/index.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    /* Customize other color variables */
  }
}
```

Or use the [Shadcn Theme Generator](https://ui.shadcn.com/themes) for a visual editor.

### 2. Sidebar Navigation

The sidebar configuration is centralized in `src/components/layout/data/sidebar-data.ts`.

**Add a new menu item:**

```typescript
{
  title: 'Your Page',
  url: '/your-page',
  icon: YourIcon, // Import from lucide-react
}
```

**Add a nested menu:**

```typescript
{
  title: 'Parent Menu',
  icon: ParentIcon,
  items: [
    {
      title: 'Child Page 1',
      url: '/parent/child-1',
    },
    {
      title: 'Child Page 2',
      url: '/parent/child-2',
    },
  ],
}
```

**Update user information:**

```typescript
user: {
  name: 'Your Name',
  email: 'your.email@example.com',
  avatar: '/path/to/avatar.jpg',
}
```

### 3. Routing & Pages

This template uses TanStack Router with file-based routing.

**Create a new page:**

1. Create a new file in `src/routes/`:
```typescript
// src/routes/my-page.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-page')({
  component: MyPage,
})

function MyPage() {
  return <div>My New Page</div>
}
```

2. The route tree will auto-generate on build
3. Add the route to your sidebar navigation (see section 2)

**Create a protected route:**

```typescript
// src/routes/_authenticated/protected-page.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/protected-page')({
  component: ProtectedPage,
})

function ProtectedPage() {
  return <div>This page requires authentication</div>
}
```

### 4. Authentication

This template includes auth page examples but **no auth logic is implemented**. To add authentication:

#### Option 1: Custom Authentication

1. Create an auth context:
```typescript
// src/contexts/auth-context.tsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (credentials) => {
    // Your login logic
  }

  const logout = () => {
    // Your logout logic
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

2. Protect routes in your route definitions
3. Update the sign-in/sign-up pages in `src/routes/(auth)/`

#### Option 2: Third-Party Auth

Popular options:
- [Clerk](https://clerk.com) - User management and authentication
- [Supabase Auth](https://supabase.com/auth) - Open source auth
- [Auth.js (NextAuth)](https://authjs.dev) - Framework-agnostic auth
- [Firebase Auth](https://firebase.google.com/products/auth) - Google's auth solution

### 5. Adding New Components

**Install a new Shadcn component:**

```bash
npx shadcn@latest add [component-name]
```

**Create a custom component:**

```typescript
// src/components/custom/my-component.tsx
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
}

export function MyComponent({ className }: MyComponentProps) {
  return (
    <div className={cn('your-classes', className)}>
      Your component content
    </div>
  )
}
```

### 6. Data Fetching

This template includes TanStack Query for data fetching.

**Example data fetching:**

```typescript
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const response = await axios.get('/api/data')
      return response.data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data</div>

  return <div>{/* Render your data */}</div>
}
```

### 7. Environment Variables

Add environment variables in `.env`:

```bash
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My Admin Dashboard
```

Access in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

### 8. Styling & Layout

**Layout options:**

The template includes multiple layout variants configurable in settings:
- Default - Standard sidebar layout
- Compact - Reduced spacing
- Full - Full-width content

**Sidebar variants:**
- Sidebar - Fixed sidebar
- Floating - Floating sidebar
- Inset - Inset sidebar

Configure these in `src/routes/_authenticated/settings/display.tsx`

**Custom styling:**

```typescript
// Use Tailwind classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-background">

// Or use the cn() utility for conditional classes
<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)}>
```

### 9. Customized Components

Some Shadcn UI components have been customized for RTL support and other improvements:

**Modified Components:**
- scroll-area
- sonner
- separator

**RTL Updated Components:**
- alert-dialog, calendar, command, dialog, dropdown-menu
- select, table, sheet, sidebar, switch

> **Note:** If you don't need RTL support, you can safely update RTL components via Shadcn CLI. For modified components, manually merge changes to preserve customizations.

Check `src/components/ui/` for implementation details.

### 10. Build & Deploy

**Build for production:**

```bash
pnpm run build
```

**Preview production build:**

```bash
pnpm run preview
```

**Deploy to Netlify:**

This template includes a `netlify.toml` configuration. Simply:
1. Push to GitHub
2. Connect your repo to Netlify
3. Deploy automatically

**Deploy to Vercel:**

```bash
npm i -g vercel
vercel
```

**Deploy to other platforms:**
The built files are in the `dist/` folder and can be deployed to any static hosting service.

## Project Structure

```
shadcn-quickstart/
├── src/
│   ├── assets/         # Images, icons, and static assets
│   ├── components/     # Reusable components
│   │   ├── ui/        # Shadcn UI components
│   │   ├── layout/    # Layout components (header, sidebar)
│   │   └── custom/    # Custom components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and libraries
│   ├── routes/        # TanStack Router pages
│   │   ├── __root.tsx           # Root layout
│   │   ├── _authenticated/      # Protected routes
│   │   ├── (auth)/             # Auth pages (login, signup)
│   │   └── (errors)/           # Error pages
│   ├── styles/        # Global styles
│   └── main.tsx       # App entry point
├── public/            # Public static files
└── package.json       # Dependencies and scripts
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Tips & Best Practices

1. **Code Organization:** Keep components small and focused. Extract reusable logic into custom hooks.

2. **Type Safety:** Use TypeScript interfaces for props and API responses.

3. **Performance:** Use React.memo() for expensive components and useMemo/useCallback for heavy computations.

4. **Accessibility:** Always include proper ARIA labels and keyboard navigation.

5. **Error Handling:** Implement error boundaries and proper error states for data fetching.

## Troubleshooting

**Issue: Route tree not updating**
```bash
# Delete the auto-generated file and rebuild
rm src/routeTree.gen.ts
pnpm dev
```

**Issue: Styles not applying**
```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
pnpm dev
```

**Issue: TypeScript errors**
```bash
# Rebuild TypeScript project
pnpm build
```

## Resources

- [Shadcn UI Documentation](https://ui.shadcn.com)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

## License

Licensed under the [MIT License](LICENSE)

---

**Happy coding! 🚀**

If you build something awesome with this template, we'd love to hear about it!
