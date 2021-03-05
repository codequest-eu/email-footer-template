import { useRef, useState } from "react";
import { Crop } from "react-image-crop";

import { prepareCanvas } from "./canvas";
import { prepareContext } from "./context";

interface ImageCropperOptions {
  cropInitState: Crop;
  imageRadius: number;
  imageSize: number;
  // eslint-disable-next-line no-unused-vars
  setCroppedImage: (url: string) => void;
}

export const useImageCropper = ({
  cropInitState,
  imageRadius,
  imageSize,
  setCroppedImage
}: ImageCropperOptions) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>(cropInitState);

  const onLoad = (img: HTMLImageElement) => {
    imageRef.current = img;
  };

  const handleCompletedCrop = async (completedCrop: Crop) => {
    const croppedImageUrl = await getCroppedImage(completedCrop);

    if (!croppedImageUrl) {
      // eslint-disable-next-line no-console
      console.error("Cannot create URL");
      return;
    }

    setCroppedImage(croppedImageUrl);
  };

  const getCroppedImage = async (completedCrop: Crop) => {
    const $canvas = document.createElement("canvas");

    prepareCanvas($canvas, imageRadius);

    const ctx = $canvas.getContext("2d");

    if (!ctx || !imageRef.current) {
      return;
    }

    const image = imageRef.current;
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

    return new Promise<string | undefined>((resolve) => {
      resolve($canvas.toDataURL("image/png"));
    });
  };

  return {
    crop,
    setCrop,
    onLoad,
    handleCompletedCrop
  };
};
