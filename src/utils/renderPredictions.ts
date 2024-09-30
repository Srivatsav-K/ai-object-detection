import { DetectedObject } from "@tensorflow-models/coco-ssd";
// import throttle from "lodash.throttle";

export const renderPredictions = (
  detectedObjects: DetectedObject[],
  context: CanvasRenderingContext2D | null
) => {
  if (context) {
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // Fonts
    const font = "16px sans-serif";
    context.font = font;
    context.textBaseline = "top";

    detectedObjects.forEach((detectedObject) => {
      const [x, y, width, height] = detectedObject.bbox;

      // bounding box
      context.strokeStyle = "green"; // border color
      context.lineWidth = 4;
      context.strokeRect(x, y, width, height); // The strokeRect() method draws a stroked rectangle whose starting point is at (x, y) and whose size is specified by width and height.

      // Draw the label background
      context.fillStyle = "green";
      const textWidth = context.measureText(detectedObject.class).width;
      const textHeight = parseInt(font, 10); // 16
      context.fillRect(x, y, textWidth + 4, textHeight + 4);

      // Draw the label text
      context.fillStyle = "white";
      context.fillText(detectedObject.class, x, y);
    });
  }
};
