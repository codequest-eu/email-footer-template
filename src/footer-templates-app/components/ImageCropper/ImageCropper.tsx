/* eslint-disable no-console */
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  image: {
    url: string | null;
    file: File | null;
  };
}

export const ImageCropper: FunctionComponent<Props> = (props) => {
  const { url } = props.image;
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 100,
    aspect: 1 / 1
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const onLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (
      !completedCrop ||
      !previewCanvasRef.current ||
      !imgRef ||
      !imgRef.current
    ) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scale = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    // const pixelRatio = window.devicePixelRatio;

    console.log(crop);

    canvas.width = 130;
    canvas.height = 130;

    if (ctx) {
      ctx.imageSmoothingQuality = "high";

      ctx.beginPath();
      ctx.arc(65, 65, 65, 0, 2 * Math.PI); //circle 100 radius, full circle 200 px
      ctx.clip(); //call the clip method so the next render is clipped in last path
      ctx.stroke();
      ctx.closePath();

      const destinationDimension = 130;

      ctx.drawImage(
        image,
        (crop.x || 0) * scale,
        (crop.y || 0) * scale,
        (crop.width || 0) * scale,
        (crop.height || 0) * scale,
        0,
        0,
        (destinationDimension || 0) * scale,
        (destinationDimension || 0) * scale
      );
    }
  }, [completedCrop]);

  return (
    <div>
      {url && (
        <ReactCrop
          src={url}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={setCrop}
          onComplete={setCompletedCrop}
          circularCrop={true}
        />
      )}
      <div>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
