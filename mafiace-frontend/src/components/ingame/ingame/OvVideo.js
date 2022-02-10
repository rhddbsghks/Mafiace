import React, { useRef, useEffect } from "react";

import * as faceapi from "face-api.js";
import { useState } from "react";

const OpenViduVideoComponen = ({ streamManager }) => {
  const videoRef = useRef();
  const [faceExpressions, setFaceExpressions] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  });
  const [chk, setChk] = useState(false);
  const [arrExpressions, setArrExpressions] = useState([]);
  const [topEmotion, setTopEmotion] = useState("");

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
      // console.log(streamManager.stream.connection.connectionId + "의 감정정보");

      if (!detections[0]) {
        setChk(false);
      } else {
        setFaceExpressions(detections[0].expressions);
        setArrExpressions(Object.entries(faceExpressions));
        // console.log(detections[0].expressions);
        setChk(true);
      }
    }, 1000);
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

  const clickBtn = () => {
    // console.log(faceExpressions);
    if (chk) {
      console.log(arrExpressions);
      // const valSort = arrExpressions.sort(([, a], [, b]) => b - a);
      // setTopEmotion(valSort[0][0]);
      // console.log(valSort);
      // console.log(topEmotion);
    } else {
      console.log("face is not detectied");
    }
  };

  return (
    <>
      <video autoPlay={true} ref={videoRef} onPlaying={onPlay} />
      <button onClick={clickBtn}>button</button>
    </>
  );
};

export default OpenViduVideoComponen;
