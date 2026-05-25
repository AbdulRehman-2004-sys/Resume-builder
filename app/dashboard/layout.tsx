import Link from "next/link";
import { FileText, LayoutDashboard, Plus, Settings, Sparkles, LogOut } from "lucide-react";
import { createClient } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 text-black">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            ResumeAI
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-100 text-black font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/build/new" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Create Resume
          </Link>
          <Link href="/dashboard/ats-check" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-black font-medium transition-colors">
            <Sparkles className="w-5 h-5" />
            ATS Check
          </Link>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 mb-4 px-3 truncate">{user.email}</div>
          <form action="/auth/signout" method="post">
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <Link href="/dashboard" className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <FileText className="w-5 h-5" />
            ResumeAI
          </Link>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
