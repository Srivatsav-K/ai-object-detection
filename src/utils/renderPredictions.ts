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

      const isPerson = detectedObject.class === "person"; // detected object is a theif

      // bounding box
      context.strokeStyle = isPerson ? "red" : "green"; // border color
      context.lineWidth = 4;
      context.strokeRect(x, y, width, height); // The strokeRect() method draws a stroked rectangle whose starting point is at (x, y) and whose size is specified by width and height.

      // fill the color
      context.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`; // fill the box with red color with 0.2 opacity if it is a person else none.
      context.fillRect(x, y, width, height);

      // Draw the label background
      context.fillStyle = isPerson ? "red" : "green";
      const textWidth = context.measureText(detectedObject.class).width;
      const textHeight = parseInt(font, 10); // 16
      context.fillRect(x, y, textWidth + 4, textHeight + 4);

      // Draw the label text
      context.fillStyle = "white";
      context.fillText(detectedObject.class, x, y);

      // if (isPerson) {
      //   playAudio();
      // }
    });
  }
};

// const playAudio = throttle(() => {
//   const audio = new Audio("/pols-aagyi-pols.mp3");
//   audio.play();
// }, 2000);
