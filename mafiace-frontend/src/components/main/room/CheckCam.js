import React, { useEffect, useState, useRef } from "react";
import { Modal } from "semantic-ui-react";
import * as faceapi from "face-api.js";
import axios from "axios";

const CheckCam = ({
  checkCam,
  setCheckCam,
  ingame,
  setIngame,
  isOwner,
  body,
  setToken,
  setGameInfo,
}) => {
  const videoRef = useRef();
  const [detected, setDetected] = useState(false);
  const [topEmotion, setTopEmotion] = useState("");
  const [faceRecog, setFaceRecog] = useState();

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(startVideo);
  }, []);

  const startVideo = () => {
    console.log(videoRef.current);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        videoRef.current.srcObject = stream;
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const enterIngame = () => {
    if (!detected) {
      alert("얼굴이 감지되지 않습니다!");
      return;
    }

    if (isOwner) handleCamOff();
    else setIngame(!ingame);
    clearInterval(faceRecog);
  };

  const handleCamOff = () => {
    setCheckCam(false);
    clearInterval(faceRecog);

    if (isOwner) {
      axios
        .post("/mafiace/api/session/token", body, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        })
        .then((res) => {
          let newBody = body;
          newBody.id = res.data.newSessionInfo.gameId;
          newBody.password = "";
          setGameInfo(newBody);
          setToken(res.data.newSessionInfo.token);
          setIngame(!ingame);
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.status === 403) {
            localStorage.removeItem("jwt");
            window.location.reload();
            alert("요청 권한이 없습니다");
          }
        });
    }
  };

  const onPlay = async () => {
    if (
      videoRef.current.paused ||
      videoRef.current.ended ||
      !faceapi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => onPlay());
      return;
    }

    setFaceRecog(
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        if (!detections[0]) {
          setDetected(false);
        } else {
          let faces = detections[0].expressions;
          faces.neutral = faces.neutral * 0.5;
          faces.happy = faces.happy * 0.8;
          faces.angry = faces.angry * 5;
          faces.surprised = faces.surprised + faces.fearful;
          faces.sad = faces.sad + faces.disgusted;
          faces.sad = faces.sad * 5;

          console.log(detections[0].expressions);
          const valSort = Object.entries(detections[0].expressions).sort(
            ([, a], [, b]) => b - a
          );
          setTopEmotion(valSort[0][0]);

          console.log(valSort[0][0]);
          setDetected(true);
        }
      }, 1000)
    );
  };

  return (
    <>
      <Modal
        dimmer="inverted"
        size="tiny"
        open={checkCam}
        onClose={() => handleCamOff()}
        onOpen={() => setCheckCam(true)}
        className="make-body"
        style={{ height: "600px" }}
      >
        <div className="room-make-box" style={{ height: "100%" }}>
          <div style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div className="room-make-box-title">카메라 테스트</div>
              {!detected ? (
                <div style={{ textAlign: "center", fontSize: "3em" }}>
                  얼굴이 감지되지 않아요😂
                </div>
              ) : (
                <div style={{ textAlign: "center", fontSize: "3em" }}>
                  표정을 다양하게 지어보세요!😎
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <video
                  ref={videoRef}
                  id="check-video"
                  autoPlay
                  muted
                  style={{
                    margin: "5% auto",
                    width: "80%",
                    position: "absolute",
                    top: "0px",
                  }}
                  onPlaying={onPlay}
                ></video>
                {detected ? (
                  <img
                    src={`/img/${topEmotion}.png`}
                    alt=""
                    style={{
                      position: "absolute",
                      width: "100px",
                      top: "30px",
                      left: "10%",
                    }}
                  />
                ) : (
                  <img
                    src={`/img/dead.png`}
                    alt=""
                    style={{
                      position: "absolute",
                      width: "100px",
                      top: "30px",
                      left: "10%",
                    }}
                  />
                )}
              </div>
              <div style={{ height: "300px" }}></div>

              <div
                style={{
                  display: "flex",
                  height: "50px",
                  justifyContent: "center",
                  marginTop: "10%",
                }}
              >
                <button
                  className="create-room-btn make"
                  onClick={() => enterIngame()}
                >
                  입장
                </button>
                {isOwner ? null : (
                  <button
                    className="create-room-btn cancel"
                    onClick={() => handleCamOff()}
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckCam;
