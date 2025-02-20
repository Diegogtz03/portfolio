"use client";

import { PictureDataList } from "@/interfaces/admin";
import Image from "next/image";

export default function PictureSelector({
  images,
  setImages,
  index,
}: {
  images: PictureDataList;
  setImages: (images: PictureDataList) => void;
  index: number;
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages({
      pictures: images.pictures.map((picture, i) =>
        i === index ? { ...picture, name: e.target.value } : picture
      ),
    });
  };

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages({
      pictures: images.pictures.map((picture, i) =>
        i === index ? { ...picture, alt: e.target.value } : picture
      ),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages({
      pictures: images.pictures.map((picture, i) =>
        i === index
          ? { ...picture, image: e.target.files?.[0] ?? new File([], "") }
          : picture
      ),
    });
  };

  const handleDelete = () => {
    setImages({
      pictures: images.pictures.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-96 border border-dark-border rounded-lg p-4 items-center m-4">
      <Image
        src={URL.createObjectURL(images.pictures[index].image)}
        alt={images.pictures[index].alt}
        width={100}
        height={100}
      />
      <input
        type="text"
        value={images.pictures[index].name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="text"
        value={images.pictures[index].alt}
        onChange={handleAltChange}
        placeholder="Alt"
      />
      <input type="file" onChange={handleFileChange} />
      <input type="number" value={images.pictures[index].order} />

      <button
        onClick={handleDelete}
        className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
      >
        Delete
      </button>
    </div>
  );
}
