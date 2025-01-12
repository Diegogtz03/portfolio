"use client";

import { SkillData, SkillDataList } from "@/interfaces/admin";
import { useState } from "react";
import { uploadImageToBucket } from "@/helper/imageBucket";
import { PictureData } from "@/interfaces/admin";
import { SkillCard } from "./SkillCard";
import { useRouter } from "next/navigation";

export default function SkillEditor({ skills }: { skills: SkillDataList }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File>(new File([], ""));
  const [highlighted, setHighlighted] = useState(false);
  const [isHobbie, setIsHobbie] = useState(false);
  const [isLanguage, setIsLanguage] = useState(true);

  const router = useRouter();

  const handleCreateNewSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageData: PictureData = {
      name: name,
      image: image,
      alt: name,
      order: 0,
    };

    const imageUploadUrl = await uploadImageToBucket("skills", imageData);

    await fetch("http://localhost:3001/api/skills", {
      method: "POST",
      body: JSON.stringify({
        name,
        highlighted,
        isHobbie,
        isLanguage,
        url: imageUploadUrl,
      }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setName("");
    setImage(new File([], ""));
    setHighlighted(false);
    setIsHobbie(false);
    setIsLanguage(true);

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-md items-center">
      <p className="text-white">LENGTH: {skills.skills.length}</p>

      <div className="flex flex-row gap-4">
        {skills.skills.map((skill: SkillData) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      <form
        className="flex flex-col gap-4 max-w-md border border-white p-4 rounded-md"
        onSubmit={handleCreateNewSkill}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 text-white rounded-md p-2"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] ?? new File([], ""))}
          className="bg-gray-800 text-white rounded-md p-2"
        />
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-row gap-2">
            <label htmlFor="highlighted" className="text-white">
              Is Highlighted
            </label>
            <input
              type="checkbox"
              checked={highlighted}
              onChange={(e) => setHighlighted(e.target.checked)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="isHobbie" className="text-white">
              Is Hobbie
            </label>
            <input
              type="checkbox"
              checked={isHobbie}
              onChange={(e) => setIsHobbie(e.target.checked)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="isLanguage" className="text-white">
              Is Language
            </label>
            <input
              type="checkbox"
              checked={isLanguage}
              onChange={(e) => setIsLanguage(e.target.checked)}
            />
          </div>
        </div>

        <button className="bg-white text-black p-2 rounded-md" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
