import {
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { r2BucketName, r2Client, r2PublicUrl } from "@/lib/r2";

export const runtime = "nodejs";

const uploadPrefix = "testpage";
const maxUploadSize = 50 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function getPublicImageUrl(key: string) {
  if (!r2PublicUrl) {
    return "";
  }

  const baseUrl = r2PublicUrl.replace(/\/$/, "");
  return `${baseUrl}/${key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

function getExtension(contentType: string) {
  if (contentType === "image/png") {
    return "png";
  }

  if (contentType === "image/webp") {
    return "webp";
  }

  return "jpg";
}

export async function GET() {
  try {
    if (!r2BucketName || !r2PublicUrl) {
      return Response.json(
        { error: "R2 environment variables are missing." },
        { status: 500 },
      );
    }

    const result = await r2Client.send(
      new ListObjectsV2Command({
        Bucket: r2BucketName,
        Prefix: `${uploadPrefix}/`,
      }),
    );

    const images = (result.Contents || [])
      .filter((item) => item.Key)
      .sort(
        (a, b) =>
          (b.LastModified?.getTime() || 0) - (a.LastModified?.getTime() || 0),
      )
      .map((item) => ({
        key: item.Key || "",
        url: getPublicImageUrl(item.Key || ""),
        size: item.Size || 0,
        uploadedAt: item.LastModified?.toISOString() || null,
      }));

    return Response.json({ images });
  } catch (error) {
    console.error("API /testpage/images GET error:", error);
    return Response.json(
      { error: "Failed to load image list.", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!r2BucketName || !r2PublicUrl) {
      return Response.json(
        { error: "R2 environment variables are missing." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Image file is required." },
        { status: 400 },
      );
    }

    if (!allowedTypes.has(file.type)) {
      return Response.json(
        { error: "Only jpg, png, and webp images are allowed." },
        { status: 400 },
      );
    }

    if (file.size > maxUploadSize) {
      return Response.json(
        { error: "Compressed image must be smaller than 50MB." },
        { status: 400 },
      );
    }

    const key = `${uploadPrefix}/${Date.now()}-${crypto.randomUUID()}.${getExtension(
      file.type,
    )}`;
    const body = Buffer.from(await file.arrayBuffer());

    await r2Client.send(
      new PutObjectCommand({
        Bucket: r2BucketName,
        Key: key,
        Body: body,
        ContentType: file.type,
      }),
    );

    return Response.json({
      image: {
        key,
        url: getPublicImageUrl(key),
        size: file.size,
        uploadedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("API /testpage/images POST error:", error);
    return Response.json(
      { error: "Failed to upload image.", details: String(error) },
      { status: 500 },
    );
  }
}
