import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { MoodBoard, ApiResponse } from "@/types"

export async function getMoodBoards(): Promise<ApiResponse<MoodBoard[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("mood_boards").select("*").order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: data as MoodBoard[] }
}

export async function getMoodBoardsByProjectId(projectId: string): Promise<ApiResponse<MoodBoard[]>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("mood_boards")
    .select("*")
    .eq("project_id", projectId)
    .order("updated_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data: data as MoodBoard[] }
}

export async function getMoodBoardById(id: string): Promise<ApiResponse<MoodBoard>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("mood_boards").select("*").eq("id", id).single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as MoodBoard }
}

export async function createMoodBoard(moodBoard: Partial<MoodBoard>): Promise<ApiResponse<MoodBoard>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("mood_boards").insert([moodBoard]).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as MoodBoard }
}

export async function updateMoodBoard(id: string, moodBoard: Partial<MoodBoard>): Promise<ApiResponse<MoodBoard>> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("mood_boards").update(moodBoard).eq("id", id).select().single()

  if (error) {
    return { error: error.message }
  }

  return { data: data as MoodBoard }
}

export async function deleteMoodBoard(id: string): Promise<ApiResponse<null>> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("mood_boards").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  return { data: null }
}
