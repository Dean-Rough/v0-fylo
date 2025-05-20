"use server"

import { cookies } from "next/headers"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { LoginCredentials, RegisterCredentials, ApiResponse } from "@/types"

export async function login(credentials: LoginCredentials): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}

export async function register(credentials: RegisterCredentials): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error: signUpError } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.full_name || null,
      },
    },
  })

  if (signUpError) {
    return { error: signUpError.message }
  }

  // After successful signup, log the user in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (signInError) {
    return { error: signInError.message }
  }

  return { data: null }
}

export async function logout() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  cookies().delete("supabase-auth-token")
  redirect("/auth/login")
}

export async function resetPassword(email: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}

export async function updatePassword(password: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
