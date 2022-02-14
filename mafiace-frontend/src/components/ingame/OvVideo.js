import React, { Component } from "react";

import * as faceapi from "face-api.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button, Popup } from "semantic-ui-react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef(null);
    this.state = {
      faceExpressions: {
        neutral: 0,
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
      },
      chk: false,
      arrExpressions: [],
      topEmotion: "",
      data: [
        {
          name: "neutral",
          uv: 0,
        },
        {
          name: "happy",
          uv: 0,
        },
        {
          name: "sad",
          uv: 0,
        },
        {
          name: "angry",
          uv: 0,
        },
        {
          name: "fearful",
          uv: 0,
        },
        {
          name: "disgusted",
          uv: 0,
        },
        {
          name: "surprised",
          uv: 0,
        },
      ],
      style: {
        borderRadius: 0,
        opacity: 0.7,
        padding: "2em",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.faceExpressions);
    console.log(this.state.arrExpressions);
    console.log(this.state.topEmotion);
    console.log(this.state.data);
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      // console.log(faceapi.nets);
    });
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    const onPlay = async () => {
      if (
        this.videoRef.current.paused ||
        this.videoRef.current.ended ||
        !faceapi.nets.tinyFaceDetector.params
      ) {
        setTimeout(() => onPlay());
        return;
      }

      const video = this.videoRef.current;
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (!detections[0]) {
          this.setState({
            chk: false,
          });
        } else {
          const valSort = Object.entries(detections[0].expressions).sort(
            ([, a], [, b]) => b - a
          );
          const arrExp = Object.entries(detections[0].expressions);
          this.setState({
            chk: true,
            faceExpressions: detections[0].expressions,
            arrExpressions: arrExp,
            topEmotion: valSort[0][0],
            data: [
              {
                name: arrExp[0][0],
                uv: arrExp[0][1],
              },
              {
                name: arrExp[1][0],
                uv: arrExp[1][1],
              },
              {
                name: arrExp[2][0],
                uv: arrExp[2][1],
              },
              {
                name: arrExp[3][0],
                uv: arrExp[3][1],
              },
              {
                name: arrExp[4][0],
                uv: arrExp[4][1],
              },
              {
                name: arrExp[5][0],
                uv: arrExp[5][1],
              },
              {
                name: arrExp[6][0],
                uv: arrExp[6][1],
              },
            ],
          });
        }
      }, 1000);
    };
    return (
      <>
        <video autoPlay={true} ref={this.videoRef} onPlaying={onPlay} />

        {/* <button onClick={this.handleClick}>button</button> */}
        <Popup
          trigger={<Button icon="eye" />}
          style={this.state.style}
          inverted
        >
          <BarChart
            width={500}
            height={300}
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
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </Popup>
      </>
    );
  }
}
