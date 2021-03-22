import { Crop } from "react-image-crop";

interface PrepareContext {
  ctx: CanvasRenderingContext2D;
  image: CanvasImageSource;
  scale: number;
  imageSize: number;
  sourceCropData: Crop;
}

export const prepareContext = (contextParams: PrepareContext) => {
  const { ctx, imageSize } = contextParams;

  createCanvasCircle(ctx, imageSize / 2);
  createImage(contextParams);
};

const createCanvasCircle = (ctx: CanvasRenderingContext2D, radius: number) => {
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.clip();
  ctx.closePath();
};

const createImage = ({
  ctx,
  image,
  imageSize,
  scale,
  sourceCropData
}: PrepareContext) => {
  const { x = 0, y = 0, width = 0, height = 0 } = sourceCropData;

  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    x * scale,
    y * scale,
    width * scale,
    height * scale,
    0,
    0,
    imageSize,
    imageSize
  );
};
