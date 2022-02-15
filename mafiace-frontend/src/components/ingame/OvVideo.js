import React, { Component } from "react";

import * as faceapi from "face-api.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Popup } from "semantic-ui-react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef(null);
    this.state = {
      // faceExpressions: {
      //   neutral: 0,
      //   happy: 0,
      //   sad: 0,
      //   angry: 0,
      //   fearful: 0,
      //   disgusted: 0,
      //   surprised: 0,
      // },
      // arrExpressions: [],
      topEmotion: "",
      data: [
        {
          // name: "neutral",
          name: "평온",
          uv: 0,
        },
        {
          // name: "happy",
          name: "기쁨",
          uv: 0,
        },
        {
          // name: "sad",
          name: "슬픔",
          uv: 0,
        },
        {
          // name: "angry",
          name: "화남",
          uv: 0,
        },
        {
          // name: "fearful",
          name: "두려움",
          uv: 0,
        },
        {
          // name: "disgusted",
          name: "역겨움",
          uv: 0,
        },
        {
          // name: "surprised",
          name: "놀람",
          uv: 0,
        },
      ],
      style: {
        height: 200,
        opacity: 0.7,
      },
    };

    this.handleClick = this.handleClick.bind(this);
    this.onPlay = this.onPlay.bind(this);
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      // console.log(faceapi.nets);
    });
  }

  handleClick() {
    console.log(this.state.faceExpressions);
    console.log(this.state.arrExpressions);
    console.log(this.state.topEmotion);
    console.log(this.state.data);
  }

  async onPlay() {
    if (
      this.videoRef.current.paused ||
      this.videoRef.current.ended ||
      !faceapi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => this.onPlay());
      return;
    }

    const video = this.videoRef.current;
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections[0]) {
        let faces = detections[0].expressions;
        faces.neutral = faces.neutral * 0.5;
        faces.happy = faces.happy * 0.8;
        faces.angry = faces.angry * 5;
        faces.surprised = faces.surprised + faces.fearful;
        faces.sad = faces.sad + faces.disgusted;
        faces.sad = faces.sad * 5;

        const arrExp = Object.entries(detections[0].expressions);
        const valSort = Object.entries(detections[0].expressions).sort(
          ([, a], [, b]) => b - a
        );

        this.setState({
          // faceExpressions: detections[0].expressions,
          // arrExpressions: arrExp,
          topEmotion: valSort[0][0],
          data: [
            {
              // neutral
              // name: arrExp[0][0],
              name: "평온",
              uv: arrExp[0][1],
              // uv: arrExp[0][1] * 0.5,
            },
            {
              // happy
              // name: arrExp[1][0],
              name: "기쁨",
              uv: arrExp[1][1],
              // uv: arrExp[1][1] * 0.8,
            },
            {
              // sad
              // name: arrExp[2][0],
              name: "슬픔",
              uv: arrExp[2][1],
              // uv: (arrExp[2][1] + arrExp[5][1]) * 5,
            },
            {
              // angry
              // name: arrExp[3][0],
              name: "화남",
              uv: arrExp[3][1],
              // uv: arrExp[3][1] * 5,
            },
            {
              // fearful
              // name: arrExp[4][0],
              name: "두려움",
              uv: arrExp[4][1],
            },
            {
              // disgusted
              // name: arrExp[5][0],
              name: "역겨움",
              uv: arrExp[5][1],
            },
            {
              // surprised
              // name: arrExp[6][0],
              name: "놀람",
              uv: arrExp[6][1],
              // uv: arrExp[6][1] + arrExp[4][1],
            },
          ],
        });
      }
    }, 1000);
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
    this.onPlay();
    console.log("componentDidmount");
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentWillUnmount() {
    // clearInterval(this.setTimer);
  }

  render() {
    return (
      <>
        <video autoPlay={true} ref={this.videoRef} onPlaying={this.onPlay} />
        <p></p>
        <Popup
          trigger={
            <img
              src={`/img/${this.state.topEmotion}.png`}
              alt=""
              style={{
                position: "absolute",
                width: "100px",
                top: "15%",
                right: "5%",
              }}
            />
          }
          style={this.state.style}
          inverted
        >
          <BarChart
            width={350}
            height={200}
            data={this.state.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </Popup>
      </>
    );
  }
}
