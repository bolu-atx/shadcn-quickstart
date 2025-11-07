/**
 * Authentication Module
 *
 * This module provides a backend-agnostic authentication system.
 * By default, it runs in DEMO mode with credentials:
 * - Email: demo@example.com
 * - Password: password
 *
 * To connect to your backend:
 * 1. Set DEMO_MODE = false in auth-service.ts
 * 2. Add VITE_API_URL to your .env file
 * 3. Implement the corresponding endpoints on your backend
 */

export * from './auth-service'
