import { useEffect, useRef, useState } from "react";
import { Crop } from "react-image-crop";

import { prepareCanvas } from "./canvas";
import { prepareContext } from "./context";

interface ImageCropperOptions {
  cropInitState: Crop;
  imageRadius: number;
  imageSize: number;
}

export const useImageCropper = ({
  cropInitState,
  imageRadius,
  imageSize
}: ImageCropperOptions) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>(cropInitState);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const onLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  useEffect(() => {
    const $canvas = document.getElementById(
      "template-preview-image"
    ) as HTMLCanvasElement | null;

    if (!completedCrop || !$canvas || !imgRef || !imgRef.current) {
      return;
    }

    prepareCanvas($canvas, imageRadius);

    const ctx = $canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const image = imgRef.current;
    const scale = image.naturalWidth / image.width;

    prepareContext({
      ctx,
      image,
      imageSize,
      scale,
      sourceCropData: completedCrop
    });

    const link = document.getElementById("download") as HTMLAnchorElement;
    link.setAttribute(
      "href",
      $canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    );
  }, [completedCrop, imageRadius, imageSize]);

  return {
    crop,
    setCrop,
    setCompletedCrop,
    onLoad
  };
};
