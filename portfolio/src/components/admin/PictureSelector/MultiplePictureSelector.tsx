"use client";

import { PictureDataList } from "@/interfaces/admin";
import PictureSelector from "./PictureSelector";

export default function MultiplePictureSelector({
  images,
  setImages,
}: {
  images: PictureDataList;
  setImages: (images: PictureDataList) => void;
}) {
  const handleAddPicture = () => {
    setImages({
      pictures: [
        ...images.pictures,
        {
          name: "",
          image: new File([], ""),
          order: images.pictures.length,
          alt: "",
        },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {images.pictures.map((_, index) => (
          <PictureSelector
            key={index}
            images={images}
            setImages={setImages}
            index={index}
          />
        ))}
      </div>

      <button
        onClick={handleAddPicture}
        className="bg-dark-bg border border-dark-border rounded-md p-2 text-white"
      >
        Add Picture
      </button>
    </div>
  );
}
