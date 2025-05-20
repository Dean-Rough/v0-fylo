"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { MoodBoard, MoodBoardLayout, ApiResponse } from "@/types"
import * as moodBoardRepository from "@/lib/repositories/mood-board-repository"

export async function getMoodBoards(): Promise<ApiResponse<MoodBoard[]>> {
  return moodBoardRepository.getMoodBoards()
}

export async function getMoodBoardsByProjectId(projectId: string): Promise<ApiResponse<MoodBoard[]>> {
  return moodBoardRepository.getMoodBoardsByProjectId(projectId)
}

export async function getMoodBoardById(id: string): Promise<ApiResponse<MoodBoard>> {
  return moodBoardRepository.getMoodBoardById(id)
}

export async function createMoodBoard(formData: FormData): Promise<ApiResponse<MoodBoard>> {
  const name = formData.get("name") as string
  const projectId = formData.get("project_id") as string

  if (!name) {
    return { error: "Mood board name is required" }
  }

  if (!projectId) {
    return { error: "Project ID is required" }
  }

  // Default layout data for a new mood board
  const defaultLayout: MoodBoardLayout = {
    items: [],
    background: "#FFFFFF",
    size: { width: 1200, height: 800 },
  }

  const result = await moodBoardRepository.createMoodBoard({
    name,
    project_id: projectId,
    layout_data: defaultLayout,
  })

  if (result.data) {
    revalidatePath(`/projects/${projectId}`)
    revalidatePath("/mood-boards")
  }

  return result
}

export async function updateMoodBoard(id: string, formData: FormData): Promise<ApiResponse<MoodBoard>> {
  const name = formData.get("name") as string

  if (!name) {
    return { error: "Mood board name is required" }
  }

  const result = await moodBoardRepository.updateMoodBoard(id, {
    name,
  })

  if (result.data) {
    revalidatePath(`/mood-boards/${id}`)
    revalidatePath("/mood-boards")
    const projectId = result.data.project_id
    revalidatePath(`/projects/${projectId}`)
  }

  return result
}

export async function updateMoodBoardLayout(id: string, layoutData: MoodBoardLayout): Promise<ApiResponse<MoodBoard>> {
  const result = await moodBoardRepository.updateMoodBoard(id, {
    layout_data: layoutData,
  })

  if (result.data) {
    revalidatePath(`/mood-boards/${id}`)
  }

  return result
}

export async function deleteMoodBoard(id: string): Promise<ApiResponse<null>> {
  // First get the mood board to know its project ID for revalidation
  const { data: moodBoard } = await moodBoardRepository.getMoodBoardById(id)
  const projectId = moodBoard?.project_id

  const result = await moodBoardRepository.deleteMoodBoard(id)

  if (!result.error && projectId) {
    revalidatePath(`/projects/${projectId}`)
    revalidatePath("/mood-boards")
    redirect(`/projects/${projectId}`)
  }

  return result
}
