import { getResumeById } from "@/app/actions/resumeActions";
import BuilderClient from "./BuilderClient";
import { notFound } from "next/navigation";

export default async function BuildPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  let initialData = null;

  if (id !== "new") {
    const res = await getResumeById(id);
    if (!res.success) {
      notFound();
    }
    initialData = res.data;
  }

  return <BuilderClient initialData={initialData} resumeId={id} />;
}
