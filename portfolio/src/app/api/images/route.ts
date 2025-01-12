import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const { params } = await req.json();

  params.Bucket = process.env.SPACES_BUCKET;

  let s3Client = new S3Client({
    endpoint: "https://sfo3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "sfo3",
    credentials: {
      accessKeyId: process.env.SPACES_KEY || "",
      secretAccessKey: process.env.SPACES_SECRET || "",
    },
  });

  await s3Client.send(new PutObjectCommand(params));

  return Response.json({
    url: `https://${params.Bucket}.${process.env.SPACES_ENDPOINT}/${params.Key}`,
  });
}

export async function DELETE(req: Request) {
  const { params } = await req.json();

  params.Bucket = process.env.SPACES_BUCKET;

  const s3Client = new S3Client({
    endpoint: "https://sfo3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "sfo3",
    credentials: {
      accessKeyId: process.env.SPACES_KEY || "",
      secretAccessKey: process.env.SPACES_SECRET || "",
    },
  });

  await s3Client.send(new DeleteObjectCommand(params));

  return Response.json({
    message: "Image deleted successfully",
  });
}
