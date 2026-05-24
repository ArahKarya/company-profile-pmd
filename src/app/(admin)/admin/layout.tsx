import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-surface-section">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
          user={{ name: session.user.name, email: session.user.email }}
          logoutAction={logoutAction}
        />
        <main id="main" className="flex-1 p-6 md:p-10 max-w-[1600px] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
