import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "@tensorflow/tfjs";
import {
  ObjectDetection as ObjectDetector,
  load as cocoSSDLoad,
} from "@tensorflow-models/coco-ssd";

import { renderPredictions } from "../utils/renderPredictions";

const detectIntervalMs = 500;
let detectIntervalId: number;

const ObjectDetection = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(false);

  const runObjectDetection = async (net: ObjectDetector) => {
    const canvas = canvasRef.current;
    const video = webcamRef.current?.video;
    if (canvas && video?.readyState === 4) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const detectedObjects = await net.detect(video, undefined, 0.6);
      console.log(
        "🚀 ~ runObjectDetection ~ detectedObjects:",
        detectedObjects
      );

      const canvasContext = canvas.getContext("2d");

      renderPredictions(detectedObjects, canvasContext);
    }
  };

  const runCoco = async () => {
    try {
      setLoading(true);

      const net = await cocoSSDLoad();

      detectIntervalId = setInterval(() => {
        runObjectDetection(net);
      }, detectIntervalMs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const showmyVideo = () => {
    // adjust resolution
    const video = webcamRef.current?.video;
    if (video?.readyState === 4) {
      const myVideoWidth = video.videoWidth;
      const myVideoHeight = video.videoHeight;

      video.width = myVideoWidth;
      video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    showmyVideo();
    runCoco();

    return () => {
      clearInterval(detectIntervalId);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          className="w-full lg:h-[720px] rounded-md"
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 z-10 w-full lg:h-[720px]"
        />
      </div>
    </div>
  );
};
export default ObjectDetection;
