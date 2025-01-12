"use client";

import { PictureData, SkillData } from "@/interfaces/admin";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageToBucket } from "@/helper/imageBucket";

export default function Skill({ params }: { params: { id: string } }) {
  const [skillData, setSkillData] = useState<SkillData | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File>(new File([], ""));
  const [highlighted, setHighlighted] = useState(false);
  const [isHobbie, setIsHobbie] = useState(false);
  const [isLanguage, setIsLanguage] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchSkill = async () => {
      const skill = await fetch(
        `http://localhost:3001/api/skills/${params.id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const data = await skill.json();
      setSkillData(data.data);
      setName(data.data.name);
      setHighlighted(data.data.highlighted);
      setIsHobbie(data.data.is_hobbie);
      setIsLanguage(data.data.is_language);
    };

    fetchSkill();
  }, [params.id]);

  if (!skillData) return <div>Loading...</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUploadUrl = skillData.url;

    if (image.size != 0) {
      const pictureData: PictureData = {
        name: name,
        image: image,
        alt: name,
        order: 0,
      };

      imageUploadUrl = await uploadImageToBucket("skills", pictureData);
    }

    const res = await fetch(`http://localhost:3001/api/skills/${params.id}`, {
      method: "PUT",
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

    router.push("/admin/skills");
  };

  return (
    <main className="flex flex-col gap-4 items-center p-10">
      <button
        className="text-white text-2xl font-bold"
        onClick={() => router.back()}
      >
        {"<"} Back
      </button>
      <form
        className="flex flex-col gap-4 items-center p-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          defaultValue={skillData.name}
          onChange={(e) => setName(e.target.value)}
          className="text-white text-3xl font-bold bg-transparent border-none outline-none bg-gray-500 p-2 rounded-md text-center"
        />
        <Image
          src={skillData.url}
          alt={skillData.name}
          width={100}
          height={100}
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            name="url"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? new File([], ""))}
            className="text-white bg-gray-500 p-2 rounded-md"
          />
          <button
            className="text-white text-xl font-bold bg-gray-500 p-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              const fileInput = document.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement;
              fileInput.value = "";
              setImage(new File([], ""));
            }}
          >
            clear
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="highlighted" className="text-white text-2xl">
            Highlighted
          </label>
          <input
            type="checkbox"
            name="highlighted"
            id="highlighted"
            className="text-white text-2xl"
            defaultChecked={skillData.highlighted}
            onChange={(e) => setHighlighted(e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="is_hobbie" className="text-white text-2xl">
            Is Hobbie
          </label>
          <input
            type="checkbox"
            name="is_hobbie"
            id="is_hobbie"
            className="text-white text-2xl"
            defaultChecked={skillData.is_hobbie}
            onChange={(e) => setIsHobbie(e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="is_language" className="text-white text-2xl">
            Is Language
          </label>
          <input
            type="checkbox"
            name="is_language"
            id="is_language"
            className="text-white text-2xl"
            defaultChecked={skillData.is_language}
            onChange={(e) => setIsLanguage(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          className="text-white text-2xl font-bold bg-gray-500 p-2 rounded-md"
        >
          Save
        </button>
      </form>
    </main>
  );
}
