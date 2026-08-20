"use server";

import { redirect } from "next/navigation";
import { login } from "@/server/auth";

export interface LoginState {
  error?: string;
  /** Echoed back so a failed attempt does not clear the field. */
  email?: string;
}

export async function signIn(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter both an email and a password.", email };
  }

  const user = await login(email, password);
  if (!user) {
    // Deliberately the same message for an unknown email and a wrong password.
    return { error: "Those credentials were not recognised.", email };
  }

  redirect("/admin");
}
