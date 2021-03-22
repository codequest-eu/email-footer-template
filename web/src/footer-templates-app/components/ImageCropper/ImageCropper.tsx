import { Paper } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { useImageCropper } from "./useImageCropper";

interface Props {
  url: string;
  // eslint-disable-next-line no-unused-vars
  setCroppedImage: (url: string) => void;
}

const imageRadius = 65;
const imageSize = 2 * imageRadius;
const cropInitState: Crop = {
  unit: "px",
  width: imageSize,
  aspect: 1 / 1
};

export const ImageCropper: FunctionComponent<Props> = ({
  url,
  setCroppedImage
}) => {
  const { crop, onLoad, handleCompletedCrop, setCrop } = useImageCropper({
    imageRadius,
    imageSize,
    cropInitState,
    setCroppedImage
  });

  return (
    <Paper style={{ display: "flex", justifyContent: "center", padding: 10 }}>
      <div>
        <ReactCrop
          src={url}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={setCrop}
          onComplete={handleCompletedCrop}
          circularCrop={true}
        />
      </div>
    </Paper>
  );
};
