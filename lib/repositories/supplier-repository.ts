import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Supplier, ApiResponse } from "@/types"

export async function getSuppliers(): Promise<ApiResponse<Supplier[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("suppliers").select("*").order("name", { ascending: true })

  if (error) {
    return { error: error.message }
  }

  return { data: data as Supplier[] }
}

export async function getSupplierById(id: string): Promise<ApiResponse<Supplier>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("suppliers").select("*").eq("id", id).single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Supplier }
}

export async function createSupplier(supplier: Partial<Supplier>): Promise<ApiResponse<Supplier>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("suppliers").insert([supplier]).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Supplier }
}

export async function updateSupplier(id: string, supplier: Partial<Supplier>): Promise<ApiResponse<Supplier>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("suppliers").update(supplier).eq("id", id).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Supplier }
}

export async function deleteSupplier(id: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("suppliers").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}
