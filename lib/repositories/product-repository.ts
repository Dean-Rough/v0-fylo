import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Product, ApiResponse } from "@/types"

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: data as Product[] }
}

export async function getProductsBySupplierId(supplierId: string): Promise<ApiResponse<Product[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("supplier_id", supplierId)
    .order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: data as Product[] }
}

export async function getProductById(id: string): Promise<ApiResponse<Product>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Product }
}

export async function createProduct(product: Partial<Product>): Promise<ApiResponse<Product>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").insert([product]).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Product }
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<ApiResponse<Product>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("products").update(product).eq("id", id).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Product }
}

export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}
