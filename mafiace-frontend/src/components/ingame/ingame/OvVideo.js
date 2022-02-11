import React, { useRef, useEffect } from "react";

import * as faceapi from "face-api.js";
import { useState } from "react";

const OpenViduVideoComponen = ({ streamManager }) => {
  const videoRef = useRef();
  const [faceExpressions, setFaceExpressions] = useState({});

  const onPlay = async () => {
    if (
      videoRef.current.paused ||
      videoRef.current.ended ||
      !faceapi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => onPlay());
      return;
    }

    const video = videoRef.current;
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      console.log(streamManager.stream.connection.connectionId + "의 감정정보");

      if (!detections[0]) console.log("감지안됨");
      else {
        console.log(detections[0].expressions);
        setFaceExpressions(detections[0].expressions);
      }
    }, 100000);
  };

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      console.log(faceapi.nets);
    });

    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  return (
    <>
      <video autoPlay={true} ref={videoRef} onPlaying={onPlay} />
    </>
  );
};

export default OpenViduVideoComponen;
