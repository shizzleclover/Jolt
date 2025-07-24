import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

export type AuthUser = User

export interface AuthError {
  message: string
  code?: string
}

export interface AuthResponse {
  success: boolean
  error?: AuthError
  user?: User
  needsVerification?: boolean
}

// Sign up a new user with email verification via OTP
export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // No redirect URL for OTP flow
      },
    })

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    if (data.user && !data.user.email_confirmed_at) {
      return { 
        success: true, 
        user: data.user, 
        needsVerification: true 
      }
    }

    return { success: true, user: data.user }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred during sign up' } 
    }
  }
}

// Verify email using OTP code
export async function verifyEmailOtp(email: string, token: string): Promise<AuthResponse> {
  try {
    
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    return { success: true, user: data.user }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred during verification' } 
    }
  }
}

// Resend email verification OTP
export async function resendEmailVerification(email: string): Promise<AuthResponse> {
  try {
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: undefined, // No redirect URL for OTP flow
      }
    })

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred while resending verification' } 
    }
  }
}

// Sign in an existing user
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    return { success: true, user: data.user }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred during sign in' } 
    }
  }
}

// Sign out the current user
export async function signOut(): Promise<AuthResponse> {
  try {
    
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred during sign out' } 
    }
  }
}

// Reset password - sends OTP to email
export async function resetPassword(email: string): Promise<AuthResponse> {
  try {
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: undefined, // No redirect URL for OTP flow
    })

    if (error) {
      return { success: false, error: { message: error.message, code: error.message } }
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred while sending reset email' } 
    }
  }
}

// Verify password reset OTP and update password
export async function verifyPasswordResetOtp(email: string, token: string, newPassword: string): Promise<AuthResponse> {
  try {
    
    // First verify the OTP
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery'
    })

    if (verifyError) {
      return { success: false, error: { message: verifyError.message, code: verifyError.message } }
    }

    // Then update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (updateError) {
      return { success: false, error: { message: updateError.message, code: updateError.message } }
    }

    return { success: true, user: data.user }
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'An unexpected error occurred while resetting password' } 
    }
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    return null
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user || null)
    }
  )

  return { data: { subscription } }
} 