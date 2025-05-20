import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Project, ApiResponse } from "@/types"

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: data as Project[] }
}

export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Project }
}

export async function createProject(project: Partial<Project>): Promise<ApiResponse<Project>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("projects").insert([project]).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Project }
}

export async function updateProject(id: string, project: Partial<Project>): Promise<ApiResponse<Project>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("projects").update(project).eq("id", id).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as Project }
}

export async function deleteProject(id: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}
