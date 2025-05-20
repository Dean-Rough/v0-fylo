"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Product, ApiResponse } from "@/types"
import * as productRepository from "@/lib/repositories/product-repository"

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return productRepository.getProducts()
}

export async function getProductsBySupplierId(supplierId: string): Promise<ApiResponse<Product[]>> {
  return productRepository.getProductsBySupplierId(supplierId)
}

export async function getProductById(id: string): Promise<ApiResponse<Product>> {
  return productRepository.getProductById(id)
}

export async function createProduct(formData: FormData): Promise<ApiResponse<Product>> {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : undefined
  const supplierId = formData.get("supplier_id") as string
  const category = formData.get("category") as string
  const tagsString = formData.get("tags") as string
  const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : undefined

  if (!name) {
    return { error: "Product name is required" }
  }

  const result = await productRepository.createProduct({
    name,
    description: description || undefined,
    price,
    supplier_id: supplierId || undefined,
    category: category || undefined,
    tags,
  })

  if (result.data) {
    revalidatePath("/products")
    if (supplierId) {
      revalidatePath(`/suppliers/${supplierId}`)
    }
  }

  return result
}

export async function updateProduct(id: string, formData: FormData): Promise<ApiResponse<Product>> {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") ? Number.parseFloat(formData.get("price") as string) : undefined
  const supplierId = formData.get("supplier_id") as string
  const category = formData.get("category") as string
  const tagsString = formData.get("tags") as string
  const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : undefined

  if (!name) {
    return { error: "Product name is required" }
  }

  const result = await productRepository.updateProduct(id, {
    name,
    description: description || undefined,
    price,
    supplier_id: supplierId || undefined,
    category: category || undefined,
    tags,
  })

  if (result.data) {
    revalidatePath(`/products/${id}`)
    revalidatePath("/products")
    if (supplierId) {
      revalidatePath(`/suppliers/${supplierId}`)
    }
  }

  return result
}

export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
  // First get the product to know its supplier ID for revalidation
  const { data: product } = await productRepository.getProductById(id)
  const supplierId = product?.supplier_id

  const result = await productRepository.deleteProduct(id)

  if (!result.error) {
    revalidatePath("/products")
    if (supplierId) {
      revalidatePath(`/suppliers/${supplierId}`)
    }
    redirect("/products")
  }

  return result
}
