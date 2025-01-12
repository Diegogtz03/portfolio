import SkillEditor from "@/components/admin/SkillEditor/SkillEditor";
import { SkillDataList, SkillData } from "@/interfaces/admin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Skills() {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin");
  }

  let data = await fetch(`${process.env.API_ROOT_ROUTE}/skills`, {
    method: "GET",
    cache: "no-store",
  });

  if (!data.ok) {
    return <div>Failed to fetch skills</div>;
  }

  let skills = (await data.json()) as SkillDataList;

  return (
    <div className="flex flex-col gap-4 p-10 items-center">
      <SkillEditor skills={skills} />
    </div>
  );
}
