import { PictureData } from "@/interfaces/admin";

const SPACES_BUCKET = process.env.SPACES_BUCKET;

export const uploadImageToBucket = async (
  folder: string,
  data: PictureData
) => {
  const params = {
    Bucket: SPACES_BUCKET || "",
    Key: `${folder}/${data.name}.${data.image.type.split("/")[1]}`,
    Body: Buffer.from(await data.image.arrayBuffer()),
    ACL: "public-read" as const,
    Metadata: {},
    ContentLength: data.image.size,
  };

  try {
    let res = await fetch("http://localhost:3001/api/images", {
      method: "POST",
      body: JSON.stringify({ params: params }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let url: { url: string } = await res.json();
    return url.url;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export const deleteImageFromBucket = async (url: string) => {
  const params = {
    Bucket: SPACES_BUCKET || "",
    Key: `${folder}/${data.name}.${data.image.type.split("/")[1]}`,
  };
};
