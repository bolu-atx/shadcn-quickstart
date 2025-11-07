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

4. Open [http://localhost:5173](http://localhost:5173) in your browser

5. Sign in with demo credentials:
   - **Email:** demo@example.com
   - **Password:** password

### Project Status

✅ **Ready to use** - This template is fully functional in demo mode
🔌 **Backend-agnostic** - Works with any backend (FastAPI, Express, Django, etc.)
🎨 **Customizable** - Easy to brand and extend

## Next Steps

### For Humans 👤

After getting the app running, here's what to do next:

1. **Explore the Demo** - Sign in with `demo@example.com` / `password` and explore all the pages
2. **Customize Branding** - Update colors, logo, and app name (see [Branding & Theme](#1-branding--theme))
3. **Connect Your Backend** - Follow the [Authentication Guide](#4-authentication-backend-agnostic) to connect to your API
4. **Modify Navigation** - Edit `src/components/layout/data/sidebar-data.ts` to add your pages
5. **Build Your Pages** - Create new routes in `src/routes/` for your features

### For AI Agents 🤖

This codebase is designed to be agent-friendly. Here's how to work with it:

**Project Structure:**
- `src/routes/` - File-based routing (TanStack Router)
- `src/components/` - Reusable UI components
- `src/lib/auth/` - Authentication service (backend-agnostic)
- `src/stores/` - Zustand state management
- `src/features/` - Feature-specific components

**Key Files:**
- `src/lib/auth/auth-service.ts` - Auth integration point (set DEMO_MODE = false for real backend)
- `src/components/layout/data/sidebar-data.ts` - Navigation configuration
- `src/routes/__root.tsx` - Root layout and providers
- `.env` - Environment variables (create from .env.example)

**Common Tasks:**

1. **Add a new page:**
   - Create file in `src/routes/` (e.g., `src/routes/my-page.tsx`)
   - Add route to sidebar in `src/components/layout/data/sidebar-data.ts`

2. **Connect to backend:**
   - Update `VITE_API_URL` in `.env`
   - Set `DEMO_MODE = false` in `src/lib/auth/auth-service.ts`
   - Backend should implement: POST /auth/login, POST /auth/register, GET /auth/me

3. **Add a component:**
   - Use `npx shadcn@latest add [component-name]` for Shadcn components
   - Create custom components in `src/components/custom/`

4. **Modify theme:**
   - Edit CSS variables in `src/index.css`
   - Or use https://ui.shadcn.com/themes for visual editing

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

### 4. Authentication (Backend-Agnostic)

This template includes a **fully functional authentication system** that works in demo mode by default and can be connected to **any backend framework**.

#### Current Setup

✅ **Demo Mode Active** - Sign in with: `demo@example.com` / `password`
✅ **Complete Auth UI** - Login, signup, forgot password, OTP pages
✅ **OAuth Ready** - GitHub, Facebook, Google integration helpers
✅ **Backend Agnostic** - Works with FastAPI, Express, Django, Rails, etc.

#### Architecture

The auth system is located in `src/lib/auth/auth-service.ts` and uses:
- **Zustand** for state management (`src/stores/auth-store.ts`)
- **Cookies** for token persistence
- **Axios** for API calls (configurable)

#### Using Demo Mode

Demo mode is enabled by default. Test authentication with:
- Email: `demo@example.com`
- Password: `password`

To modify demo behavior, edit `src/lib/auth/auth-service.ts`:
```typescript
const DEMO_MODE = true // Change to false when ready
const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password',
}
```

#### Connecting to Your Backend

##### Step 1: Set up environment variables

Create a `.env` file:
```bash
VITE_API_URL=http://localhost:8000
```

##### Step 2: Disable demo mode

Edit `src/lib/auth/auth-service.ts`:
```typescript
const DEMO_MODE = false // Disable demo mode
```

##### Step 3: Implement backend endpoints

The auth service expects these endpoints:

**Required Endpoints:**
- `POST /auth/login` - Sign in with credentials
- `POST /auth/register` - Create new account
- `POST /auth/logout` - Sign out
- `GET /auth/me` - Get current user

**Optional Endpoints:**
- `POST /auth/refresh` - Refresh access token
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

#### Backend Integration Examples

##### FastAPI (Python)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    user: dict
    accessToken: str

@app.post("/auth/login", response_model=AuthResponse)
async def login(credentials: LoginRequest):
    # Your authentication logic
    user = authenticate_user(credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(user.id)
    return {
        "user": {
            "accountNo": user.account_no,
            "email": user.email,
            "name": user.name,
            "role": user.roles
        },
        "accessToken": access_token
    }

@app.get("/auth/me")
async def get_current_user(token: str = Depends(get_token)):
    user = verify_token(token)
    return user
```

##### Express (Node.js/TypeScript)

```typescript
import express from 'express'
import { authenticateUser, createAccessToken } from './auth'

const app = express()

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  const user = await authenticateUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const accessToken = createAccessToken(user.id)
  res.json({
    user: {
      accountNo: user.accountNo,
      email: user.email,
      name: user.name,
      role: user.roles
    },
    accessToken
  })
})

app.get('/auth/me', authenticateToken, async (req, res) => {
  res.json(req.user)
})
```

##### Django (Python)

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
import json

@require_http_methods(["POST"])
def login(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    user = authenticate(email=email, password=password)
    if not user:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    access_token = create_access_token(user.id)
    return JsonResponse({
        'user': {
            'accountNo': user.account_no,
            'email': user.email,
            'name': user.name,
            'role': user.roles
        },
        'accessToken': access_token
    })
```

#### OAuth Integration

OAuth buttons are ready but require backend setup:

**1. Update OAuth configuration** in `src/lib/auth/auth-service.ts`:
```typescript
export const OAUTH_PROVIDERS = {
  github: {
    name: 'GitHub',
    authUrl: `${API_BASE_URL}/auth/oauth/github`,
  },
  // ... other providers
}
```

**2. Implement backend OAuth flow:**

```python
# FastAPI example
@app.get("/auth/oauth/github")
async def github_oauth():
    authorization_url = get_github_oauth_url()
    return RedirectResponse(authorization_url)

@app.get("/auth/oauth/github/callback")
async def github_callback(code: str):
    # Exchange code for user data
    user_data = await exchange_github_code(code)
    user = get_or_create_user(user_data)
    access_token = create_access_token(user.id)

    # Redirect back to frontend with token
    return RedirectResponse(
        f"http://localhost:5173/auth/callback?token={access_token}"
    )
```

**3. OAuth buttons work automatically** - clicking GitHub/Facebook will call `initiateOAuthLogin()`

#### Third-Party Auth Services

While this template supports custom backends, you can also integrate with:

- **[Clerk](https://clerk.com)** - User management and authentication
- **[Supabase Auth](https://supabase.com/auth)** - Open source auth
- **[Auth.js](https://authjs.dev)** - Framework-agnostic auth
- **[Firebase Auth](https://firebase.google.com)** - Google's auth solution

Replace the contents of `src/lib/auth/auth-service.ts` with your chosen provider's SDK.

#### Protected Routes

Routes under `src/routes/_authenticated/` are automatically protected. To add protection logic:

Edit `src/routes/_authenticated/route.tsx`:
```typescript
export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: ({ context }) => {
    // Check if user is authenticated
    const { auth } = useAuthStore.getState()
    if (!auth.accessToken) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href }
      })
    }
  }
})
```

#### Customizing Auth Behavior

**Change token expiration:**
```typescript
// In user-auth-form.tsx
const userWithExp = {
  ...response.user,
  exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
}
```

**Add remember me:**
```typescript
// In auth-store.ts - use localStorage instead of cookies
localStorage.setItem('remember_me', 'true')
```

**Add role-based access:**
```typescript
// Check user roles in beforeLoad
if (!user.role.includes('admin')) {
  throw redirect({ to: '/unauthorized' })
}
```

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
