"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Supplier, ApiResponse } from "@/types"
import * as supplierRepository from "@/lib/repositories/supplier-repository"

export async function getSuppliers(): Promise<ApiResponse<Supplier[]>> {
  return supplierRepository.getSuppliers()
}

export async function getSupplierById(id: string): Promise<ApiResponse<Supplier>> {
  return supplierRepository.getSupplierById(id)
}

export async function createSupplier(formData: FormData): Promise<ApiResponse<Supplier>> {
  const name = formData.get("name") as string
  const website = formData.get("website") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!name) {
    return { error: "Supplier name is required" }
  }

  // Create contact_info object
  const contactInfo = {
    email: email || undefined,
    phone: phone || undefined,
  }

  const result = await supplierRepository.createSupplier({
    name,
    website: website || undefined,
    contact_info: contactInfo,
  })

  if (result.data) {
    revalidatePath("/suppliers")
  }

  return result
}

export async function updateSupplier(id: string, formData: FormData): Promise<ApiResponse<Supplier>> {
  const name = formData.get("name") as string
  const website = formData.get("website") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  if (!name) {
    return { error: "Supplier name is required" }
  }

  // Create contact_info object
  const contactInfo = {
    email: email || undefined,
    phone: phone || undefined,
  }

  const result = await supplierRepository.updateSupplier(id, {
    name,
    website: website || undefined,
    contact_info: contactInfo,
  })

  if (result.data) {
    revalidatePath(`/suppliers/${id}`)
    revalidatePath("/suppliers")
  }

  return result
}

export async function deleteSupplier(id: string): Promise<ApiResponse<null>> {
  const result = await supplierRepository.deleteSupplier(id)

  if (!result.error) {
    revalidatePath("/suppliers")
    redirect("/suppliers")
  }

  return result
}
