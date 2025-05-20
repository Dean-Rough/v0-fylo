"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Project, ApiResponse } from "@/types"
import * as projectRepository from "@/lib/repositories/project-repository"
import { getCurrentUser } from "./auth"

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  return projectRepository.getProjects()
}

export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  return projectRepository.getProjectById(id)
}

export async function createProject(formData: FormData): Promise<ApiResponse<Project>> {
  const user = await getCurrentUser()

  if (!user) {
    return { error: "You must be logged in to create a project" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!name) {
    return { error: "Project name is required" }
  }

  const result = await projectRepository.createProject({
    name,
    description: description || undefined,
    user_id: user.id,
  })

  if (result.data) {
    revalidatePath("/projects")
    revalidatePath("/dashboard")
  }

  return result
}

export async function updateProject(id: string, formData: FormData): Promise<ApiResponse<Project>> {
  const user = await getCurrentUser()

  if (!user) {
    return { error: "You must be logged in to update a project" }
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!name) {
    return { error: "Project name is required" }
  }

  const result = await projectRepository.updateProject(id, {
    name,
    description: description || undefined,
  })

  if (result.data) {
    revalidatePath(`/projects/${id}`)
    revalidatePath("/projects")
    revalidatePath("/dashboard")
  }

  return result
}

export async function deleteProject(id: string): Promise<ApiResponse<null>> {
  const result = await projectRepository.deleteProject(id)

  if (!result.error) {
    revalidatePath("/projects")
    revalidatePath("/dashboard")
    redirect("/projects")
  }

  return result
}
