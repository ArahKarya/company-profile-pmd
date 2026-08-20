"use server";

import { redirect } from "next/navigation";
import { logout } from "@/server/auth";

export async function signOut(): Promise<void> {
  await logout();
  redirect("/admin/login");
}
