import React, { useRef, useEffect, useState } from "react";

import * as faceapi from "face-api.js";

import Chart from "chart.js";

const OpenViduVideoComponen = ({ streamManager }) => {
  const videoRef = useRef();
  const canvasDom = useRef();
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
        setChk(true);
        setFaceExpressions(detections[0].expressions);
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
    if (chk) {
      console.log(arrExpressions);
      console.log(topEmotion);
    } else {
      console.log("face is not detectied");
    }
  };

  useEffect(() => {
    setArrExpressions(Object.entries(faceExpressions));
  }, [faceExpressions]);
  useEffect(() => {
    const valSort = Object.entries(faceExpressions).sort(
      ([, a], [, b]) => b - a
    );
    setTopEmotion(valSort[0][0]);

    const valArr = arrExpressions.map((val) => {
      return val[1];
    });
    const ctx = canvasDom.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "neutral",
          "happy",
          "sad",
          "angry",
          "fearful",
          "disgusted",
          "surprised",
        ],
        datasets: [{ label: "감정 그래프", data: valArr }],
      },
    });
  }, [arrExpressions]);

  return (
    <>
      <video autoPlay={true} ref={videoRef} onPlaying={onPlay} />
      <button onClick={clickBtn}>button</button>
      <canvas ref={canvasDom}></canvas>
      {/* <canvas ref={canvasDom} style={{ display: "none" }}></canvas> */}
    </>
  );
};

export default OpenViduVideoComponen;
