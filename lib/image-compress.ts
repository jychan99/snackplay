type CompressImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: "image/jpeg" | "image/webp";
};

const defaultOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.75,
  mimeType: "image/webp" as const,
};

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image."));
    };

    image.src = objectUrl;
  });
}

function getResizedSize(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
) {
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

export async function compressImage(
  file: File,
  options: CompressImageOptions = {},
) {
  const { maxWidth, maxHeight, quality, mimeType } = {
    ...defaultOptions,
    ...options,
  };
  const image = await loadImage(file);
  const resized = getResizedSize(
    image.naturalWidth,
    image.naturalHeight,
    maxWidth,
    maxHeight,
  );
  const canvas = document.createElement("canvas");
  canvas.width = resized.width;
  canvas.height = resized.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to prepare image compression.");
  }

  context.drawImage(image, 0, 0, resized.width, resized.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
          return;
        }

        reject(new Error("Failed to compress image."));
      },
      mimeType,
      quality,
    );
  });

  return new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
    type: mimeType,
  });
}

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}
