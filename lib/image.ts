import { useCallback } from "react";

export async function loadImages() {
  try {
    const res = await fetch("/api/testpage/images");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to load image list.");
    }

    return data.images[0].url || [];
  } catch (error) {
    // setMessage(
    //   error instanceof Error ? error.message : "Failed to load image list.",
    // );
  } finally {
    // setIsLoadingImages(false);
  }
}
