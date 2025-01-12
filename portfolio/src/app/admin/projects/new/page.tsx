"use client";

import { useState, useEffect } from "react";
import { PictureDataList, SkillDataList, SkillData } from "@/interfaces/admin";
import { uploadImageToBucket } from "@/helper/imageBucket";
import MultiplePictureSelector from "@/components/admin/PictureSelector/MultiplePictureSelector";

// TODO: Add a way to select skills

export default function Home() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState(new Date());
  const [imageFolder, setImageFolder] = useState("");
  const [skills, setSkills] = useState<SkillData[]>([]);

  const [images, setImages] = useState<PictureDataList>({ pictures: [] });

  const [initialSkills, setInitialSkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch(`http://localhost:8080/skills`, {
        method: "GET",
        cache: "no-store",
      });
      const data = (await res.json()) as SkillDataList;
      setInitialSkills(data.skills);
    };

    fetchSkills();
  }, []);

  const postTestProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let data = {
      title: title,
      subtitle: subtitle,
      description: description,
      tags: tags,
      link: link,
      date: date.toISOString().split("T")[0],
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let response = await fetch(`http://localhost:8080/projects/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
      cache: "no-store",
    });

    let result: { id: string } = await response.json();

    // Call image uploader
    await uploadImages(result.id);
  };

  const uploadImages = async (id: string) => {
    for (let image of images.pictures) {
      let url = await uploadImageToBucket(imageFolder, image);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Fetch api to update project with image url
      await fetch(`http://localhost:8080/projects/uploadImage`, {
        method: "POST",
        body: JSON.stringify({ project_id: id, url: url, alt: image.alt }),
        headers: myHeaders,
        cache: "no-store",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full h-screen p-4 overflow-y-auto">
      <p className="text-white text-2xl font-bold">NEW PROJECT</p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="subtitle"
          value={subtitle}
          placeholder="Subtitle"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="tags"
          value={tags}
          placeholder="Tags"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          name="link"
          value={link}
          placeholder="Link"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="date"
          name="date"
          value={date.toISOString().split("T")[0]}
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <input
          type="text"
          name="imageFolder"
          value={imageFolder}
          placeholder="Image Folder"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) => setImageFolder(e.target.value)}
        />

        <select
          name="skills"
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onChange={(e) =>
            setSkills(skills.filter((skill) => skill.id === e.target.value))
          }
        >
          {initialSkills.map((skill: SkillData) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>

        <button
          className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            postTestProject(e)
          }
        >
          CREATE PROJECT
        </button>
      </form>

      <MultiplePictureSelector images={images} setImages={setImages} />
    </div>
  );
}
