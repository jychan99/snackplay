"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { compressImage, formatBytes } from "@/lib/image-compress";

type UploadedImage = {
  key: string;
  url: string;
  size: number;
  uploadedAt: string | null;
};

const maxCompressedImageSize = 50 * 1024 * 1024;

export default function TestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [message, setMessage] = useState("");

  const selectedFileSize = useMemo(
    () => (selectedFile ? formatBytes(selectedFile.size) : ""),
    [selectedFile],
  );

  const clearPreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }

      return "";
    });
  }, []);

  const loadImages = useCallback(async () => {
    setIsLoadingImages(true);

    try {
      const res = await fetch("/api/testpage/images");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load image list.");
      }

      setImages(data.images || []);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to load image list.",
      );
    } finally {
      setIsLoadingImages(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadImages();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadImages]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setMessage("");
    setCompressedSize(null);

    if (!file) {
      setSelectedFile(null);
      clearPreview();
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSelectedFile(null);
      clearPreview();
      setMessage("Only image files can be selected.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }

      return URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Select an image before saving.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const compressedFile = await compressImage(selectedFile);
      setCompressedSize(compressedFile.size);

      if (compressedFile.size > maxCompressedImageSize) {
        setMessage("Compressed image must be smaller than 50MB.");
        return;
      }

      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await fetch("/api/testpage/images", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      setImages((prev) => [data.image, ...prev]);
      setSelectedFile(null);
      clearPreview();
      setMessage("Compressed image uploaded to R2.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to upload image.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <section className="mx-auto grid w-full max-w-5xl gap-8">
        <div>
          <p className="mb-2 text-caption font-semibold text-primary">
            R2 upload test
          </p>
          <h1 className="text-h2">Image compression upload test</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-box border border-border-sub bg-white p-6 shadow-m"
        >
          <label
            htmlFor="image-upload"
            className="grid min-h-48 cursor-pointer place-items-center rounded-box border border-dashed border-border-main bg-background px-4 py-8 text-center"
          >
            <span className="text-body-l font-semibold">
              Choose an image to upload
            </span>
            <span className="mt-2 text-body-s text-text-sub">
              The save button compresses it to max 1200px WebP at 75% quality
              before uploading.
            </span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>

          {previewUrl && selectedFile ? (
            <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-start">
              <div className="relative aspect-square overflow-hidden rounded-box border border-border-sub bg-background">
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-2 text-body-m">
                <p className="font-semibold">{selectedFile.name}</p>
                <p className="text-text-sub">Original: {selectedFileSize}</p>
                {compressedSize !== null ? (
                  <p className="text-primary">
                    Compressed: {formatBytes(compressedSize)}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isUploading}
            className="h-12 rounded-button bg-primary px-6 text-button-l text-white disabled:opacity-50"
          >
            {isUploading ? "Saving..." : "Save"}
          </button>

          {message ? <p className="text-body-s text-text-sub">{message}</p> : null}
        </form>

        <section className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-h4">Uploaded images</h2>
            <button
              type="button"
              onClick={loadImages}
              disabled={isLoadingImages}
              className="h-10 rounded-button border border-border-main bg-white px-5 text-button-m disabled:opacity-50"
            >
              {isLoadingImages ? "Loading" : "Refresh"}
            </button>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((image) => (
                <article
                  key={image.key}
                  className="overflow-hidden rounded-box border border-border-sub bg-white shadow-m"
                >
                  <div className="aspect-square bg-background">
                    <img
                      src={image.url}
                      alt="Uploaded R2 item"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid gap-1 p-3 text-caption text-text-sub">
                    <p>{formatBytes(image.size)}</p>
                    <p className="truncate" title={image.key}>
                      {image.key}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-box border border-border-sub bg-white p-8 text-center text-text-sub">
              No uploaded images yet.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
