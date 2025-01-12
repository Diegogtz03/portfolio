import { SkillData } from "@/interfaces/admin";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SkillCard({ skill }: { skill: SkillData }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/skills/${skill.id}`);
  };

  const handleDelete = () => {
    // confirm delete, if yes, delete
    if (confirm("Are you sure you want to delete this skill?")) {
      // deleteSkill(skill.id);
    }
  };

  return (
    <div
      key={skill.id}
      className="bg-white text-black p-2 rounded-md flex flex-col gap-2 items-center"
    >
      <span className="text-xl font-bold">{skill.name}</span>
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={skill.url}
          alt={skill.name}
          width={50}
          height={50}
          className="rounded-md"
        />

        <span>{skill.highlighted ? "Highlighted" : "Not Highlighted"}</span>
        <span>{skill.is_hobbie ? "Hobbie" : "Not Hobbie"}</span>
        <span>{skill.is_language ? "Language" : "Not Language"}</span>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
