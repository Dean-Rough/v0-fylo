import { RegisterForm } from "@/components/auth/register-form"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export default async function RegisterPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Fylo</h1>
          <p className="mt-2 text-sm text-muted-foreground">Design Projects Made Simple</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
