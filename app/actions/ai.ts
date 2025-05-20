"use server"

import { getProductRecommendations, getDesignSuggestions } from "@/lib/grok"
import type { ApiResponse, MoodBoardItem } from "@/types"

export async function getAIProductRecommendations(prompt: string): Promise<ApiResponse<any>> {
  try {
    const { recommendations } = await getProductRecommendations(prompt)
    return { data: recommendations }
  } catch (error) {
    console.error("Error in AI product recommendations:", error)
    return { error: "Failed to get product recommendations" }
  }
}

export async function getAIDesignSuggestions(items: MoodBoardItem[]): Promise<ApiResponse<any>> {
  try {
    const { suggestions } = await getDesignSuggestions(items)
    return { data: suggestions }
  } catch (error) {
    console.error("Error in AI design suggestions:", error)
    return { error: "Failed to get design suggestions" }
  }
}
