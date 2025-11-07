/**
 * Authentication Service
 *
 * This is a backend-agnostic authentication service that can be easily
 * integrated with any backend framework (FastAPI, Express, Django, etc.)
 *
 * To integrate with your backend:
 * 1. Replace the mock functions with actual API calls
 * 2. Update the API_BASE_URL in your .env file
 * 3. Implement your OAuth provider callbacks
 */

import axios from 'axios'

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ============================================================================
// DEMO MODE - Remove this section when connecting to real backend
// ============================================================================

const DEMO_MODE = true // Set to false when using real backend
const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password',
}

// ============================================================================
// Authentication Functions
// ============================================================================

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  user: {
    accountNo: string
    email: string
    name?: string
    role: string[]
  }
  accessToken: string
  refreshToken?: string
}

/**
 * Sign in with email and password
 *
 * Backend Integration Examples:
 *
 * FastAPI (Python):
 * ```python
 * @app.post("/auth/login")
 * async def login(credentials: LoginRequest):
 *     user = authenticate_user(credentials.email, credentials.password)
 *     access_token = create_access_token(user.id)
 *     return {"user": user, "accessToken": access_token}
 * ```
 *
 * Express (Node.js):
 * ```javascript
 * app.post('/auth/login', async (req, res) => {
 *   const { email, password } = req.body
 *   const user = await authenticateUser(email, password)
 *   const accessToken = createAccessToken(user.id)
 *   res.json({ user, accessToken })
 * })
 * ```
 */
export async function signIn(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  if (DEMO_MODE) {
    // Demo mode - validate against demo credentials
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

    if (
      credentials.email === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      return {
        user: {
          accountNo: 'DEMO001',
          email: credentials.email,
          name: 'Demo User',
          role: ['user', 'admin'],
        },
        accessToken: 'demo-access-token-' + Date.now(),
        refreshToken: 'demo-refresh-token-' + Date.now(),
      }
    }

    throw new Error('Invalid credentials. Use demo@example.com / password')
  }

  // Real backend integration
  const response = await api.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

/**
 * Sign up with email and password
 *
 * Backend Integration Example:
 * ```python
 * @app.post("/auth/register")
 * async def register(data: RegisterRequest):
 *     user = create_user(data.email, data.password, data.name)
 *     access_token = create_access_token(user.id)
 *     return {"user": user, "accessToken": access_token}
 * ```
 */
export async function signUp(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  if (DEMO_MODE) {
    // Demo mode - accept any registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      user: {
        accountNo: 'ACC' + Math.random().toString(36).substring(7).toUpperCase(),
        email: credentials.email,
        name: credentials.name || 'New User',
        role: ['user'],
      },
      accessToken: 'demo-access-token-' + Date.now(),
    }
  }

  const response = await api.post<AuthResponse>('/auth/register', credentials)
  return response.data
}

/**
 * Sign out and invalidate tokens
 */
export async function signOut(): Promise<void> {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return
  }

  await api.post('/auth/logout')
}

/**
 * Refresh access token
 *
 * Backend Integration Example:
 * ```python
 * @app.post("/auth/refresh")
 * async def refresh_token(refresh_token: str):
 *     new_access_token = create_access_token_from_refresh(refresh_token)
 *     return {"accessToken": new_access_token}
 * ```
 */
export async function refreshToken(
  refreshToken: string
): Promise<{ accessToken: string }> {
  if (DEMO_MODE) {
    return {
      accessToken: 'demo-access-token-' + Date.now(),
    }
  }

  const response = await api.post<{ accessToken: string }>('/auth/refresh', {
    refreshToken,
  })
  return response.data
}

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  if (DEMO_MODE) {
    return {
      accountNo: 'DEMO001',
      email: DEMO_CREDENTIALS.email,
      name: 'Demo User',
      role: ['user', 'admin'],
    }
  }

  const response = await api.get('/auth/me')
  return response.data
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Demo: Password reset email sent to', email)
    return
  }

  await api.post('/auth/forgot-password', { email })
}

/**
 * Reset password with token
 */
export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return
  }

  await api.post('/auth/reset-password', { token, password: newPassword })
}

// ============================================================================
// OAuth Integration Helpers
// ============================================================================

/**
 * OAuth Configuration
 *
 * To enable OAuth providers:
 * 1. Add provider credentials to .env
 * 2. Configure OAuth callbacks on your backend
 * 3. Update the redirect URLs below
 */

export const OAUTH_PROVIDERS = {
  github: {
    name: 'GitHub',
    // For real implementation, use your backend OAuth endpoint
    authUrl: DEMO_MODE
      ? '#'
      : `${API_BASE_URL}/auth/oauth/github`,
  },
  google: {
    name: 'Google',
    authUrl: DEMO_MODE
      ? '#'
      : `${API_BASE_URL}/auth/oauth/google`,
  },
  facebook: {
    name: 'Facebook',
    authUrl: DEMO_MODE
      ? '#'
      : `${API_BASE_URL}/auth/oauth/facebook`,
  },
}

/**
 * Initiate OAuth flow
 *
 * Backend Integration Example (FastAPI):
 * ```python
 * @app.get("/auth/oauth/{provider}")
 * async def oauth_login(provider: str):
 *     authorization_url = get_oauth_url(provider)
 *     return RedirectResponse(authorization_url)
 *
 * @app.get("/auth/oauth/{provider}/callback")
 * async def oauth_callback(provider: str, code: str):
 *     user_data = exchange_code_for_user_data(provider, code)
 *     access_token = create_access_token(user_data)
 *     # Redirect to frontend with token
 *     return RedirectResponse(f"http://localhost:5173/auth/callback?token={access_token}")
 * ```
 */
export function initiateOAuthLogin(provider: keyof typeof OAUTH_PROVIDERS) {
  if (DEMO_MODE) {
    console.log(`Demo: OAuth login with ${provider} (not implemented in demo mode)`)
    alert(`OAuth with ${provider} is only available when connected to a backend.\n\nUse demo@example.com / password to sign in.`)
    return
  }

  const authUrl = OAUTH_PROVIDERS[provider].authUrl
  window.location.href = authUrl
}

/**
 * Handle OAuth callback
 * Call this on your OAuth callback page to extract and validate the token
 */
export function handleOAuthCallback(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}
