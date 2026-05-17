import { createBrowserClient } from '@supabase/ssr'

// Memakai variabel lingkungan resmi, jika kosong otomatis memakai teks kunci asli bawaanmu
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://plykglcgdhoxzsxupgox.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseWtnbGNnZGhveHpzeHVwZ294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczODUxMDMsImV4cCI6MjA5Mjk2MTEwM30.T6r0iA82L8YrgJStA7gPhtu00L3TEWgkfkVcJW5pVUA'

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey)