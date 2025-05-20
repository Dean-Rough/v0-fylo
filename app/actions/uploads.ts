"use server"

import { revalidatePath } from "next/cache"
import { uploadImage } from "@/lib/blob"
import type { ApiResponse } from "@/types"
import * as productRepository from "@/lib/repositories/product-repository"
import { getCurrentUser } from "./auth"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function uploadProductImage(formData: FormData): Promise<ApiResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File
    const productId = formData.get("productId") as string

    if (!file) {
      return { error: "No file provided" }
    }

    // Upload the image
    const { url } = await uploadImage(file, "products")

    // If a product ID is provided, update the product with the new image URL
    if (productId) {
      const { data: product } = await productRepository.getProductById(productId)

      if (product) {
        const imageUrls = product.image_urls || []
        await productRepository.updateProduct(productId, {
          image_urls: [...imageUrls, url],
        })

        revalidatePath(`/products/${productId}`)
        revalidatePath("/products")
      }
    }

    return { data: { url } }
  } catch (error) {
    console.error("Error uploading product image:", error)
    return { error: "Failed to upload image" }
  }
}

export async function uploadUserAvatar(formData: FormData): Promise<ApiResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { error: "No file provided" }
    }

    // Upload the avatar
    const { url } = await uploadImage(file, "avatars")

    // Update the user's avatar URL
    const user = await getCurrentUser()
    if (user) {
      const supabase = createServerSupabaseClient()
      await supabase.auth.updateUser({
        data: { avatar_url: url },
      })

      revalidatePath("/profile")
    }

    return { data: { url } }
  } catch (error) {
    console.error("Error uploading user avatar:", error)
    return { error: "Failed to upload avatar" }
  }
}

export async function uploadMoodBoardImage(formData: FormData): Promise<ApiResponse<{ url: string }>> {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { error: "No file provided" }
    }

    // Upload the image
    const { url } = await uploadImage(file, "mood-boards")

    return { data: { url } }
  } catch (error) {
    console.error("Error uploading mood board image:", error)
    return { error: "Failed to upload image" }
  }
}
