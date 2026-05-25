import Link from "next/link";
import { Plus, FileText, Calendar, ArrowRight } from "lucide-react";
import { getUserResumes } from "@/app/actions/resumeActions";

export default async function DashboardPage() {
  const { success, data: resumes, error } = await getUserResumes();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Resumes</h1>
          <p className="text-gray-500 mt-1">Manage and edit your ATS-optimized resumes.</p>
        </div>
        <Link href="/build/new" className="hidden sm:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Create New
        </Link>
      </div>

      {!success && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-8">
          Error loading resumes: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card */}
        <Link href="/build/new" className="group flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-gray-300 rounded-2xl hover:border-black hover:bg-gray-50 transition-all min-h-[280px]">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-black group-hover:text-white transition-colors mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Create New Resume</h3>
          <p className="text-sm text-gray-500 mt-2 text-center">Start fresh with an ATS-friendly template</p>
        </Link>

        {/* Existing Resumes */}
        {resumes?.map((resume) => (
          <div key={resume.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col min-h-[280px]">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 truncate">{resume.name}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4 truncate">{resume.title}</p>
            
            <div className="mt-auto">
              <div className="flex items-center text-xs text-gray-400 mb-4 gap-1">
                <Calendar className="w-4 h-4" />
                Updated {new Date(resume.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <Link href={`/build/${resume.id}`} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg text-sm font-medium text-center transition-colors">
                  Edit
                </Link>
                <Link href={`/dashboard/ats-check?resumeId=${resume.id}`} className="flex-1 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors">
                  Check AI <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
