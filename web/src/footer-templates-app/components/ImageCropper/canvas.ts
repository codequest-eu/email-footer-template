export const prepareCanvas = ($canvas: HTMLCanvasElement, radius: number) => {
  const diameterImage = 2 * radius;
  $canvas.width = diameterImage;
  $canvas.height = diameterImage;
};
