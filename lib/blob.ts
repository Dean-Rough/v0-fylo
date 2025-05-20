import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadImage(file: File, folder = "uploads") {
  try {
    // Generate a unique filename
    const filename = `${folder}/${nanoid()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    // Upload to Vercel Blob
    const { url } = await put(filename, file, {
      access: "public",
    })

    return { url }
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    throw new Error("Failed to upload image")
  }
}
