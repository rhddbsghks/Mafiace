import { useEffect } from "react";
import axios from "axios";
import * as config from "../../config";

import HeaderIngame from "./HeaderIngame";
import Ready from "../../components/ingame/ingame/Ready";
import Waiting from "../../components/ingame/ingame/Waiting";
import Play from "../../components/ingame/ingame/Play";
import Result from "../../components/ingame/ingame/Result";

const Ingame = ({ setIngame, gameId }) => {
  let OV;
  let session;
  let sessionName; // Name of the video session the user will connect to
  let token; // Token retrieved from OpenVidu Server

  const getToken = (callback) => {
    sessionName = gameId; // Video-call chosen by the user

    axios
      .get("/api/session/token", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { sessionName },
      })
      .then((res) => {
        console.log(res);
        // token = res[0]; // Get token from response
        // console.warn("Request of TOKEN gone WELL (TOKEN:" + token + ")");
        // callback(token); // Continue the join operation
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getToken(() => {});
  }, []);

  // const joinSession = () => {
  //   getToken((token) => {
  //     // --- 1) Get an OpenVidu object ---

  //     OV = new OpenVidu();

  //     // --- 2) Init a session ---

  //     session = OV.initSession();

  //     // --- 3) Specify the actions when events take place in the session ---

  //     // On every new Stream received...
  //     session.on("streamCreated", (event) => {
  //       // Subscribe to the Stream to receive it
  //       // HTML video will be appended to element with 'video-container' id
  //       var subscriber = session.subscribe(event.stream, "video-container");

  //       // When the HTML video has been appended to DOM...
  //       subscriber.on("videoElementCreated", (event) => {
  //         // Add a new HTML element for the user's name and nickname over its video
  //         appendUserData(event.element, subscriber.stream.connection);
  //       });
  //     });

  //     // On every Stream destroyed...
  //     session.on("streamDestroyed", (event) => {
  //       // Delete the HTML element with the user's name and nickname
  //       removeUserData(event.stream.connection);
  //     });

  //     // On every asynchronous exception...
  //     session.on("exception", (exception) => {
  //       console.warn(exception);
  //     });

  //     // --- 4) Connect to the session passing the retrieved token and some more data from
  //     //        the client (in this case a JSON with the nickname chosen by the user) ---

  //     var nickName = $("#nickName").val();
  //     session
  //       .connect(token, { clientData: nickName })
  //       .then(() => {
  //         // --- 5) Set page layout for active call ---

  //         var userName = $("#user").val();
  //         $("#session-title").text(sessionName);
  //         $("#join").hide();
  //         $("#session").show();

  //         // Here we check somehow if the user has 'PUBLISHER' role before
  //         // trying to publish its stream. Even if someone modified the client's code and
  //         // published the stream, it wouldn't work if the token sent in Session.connect
  //         // method is not recognized as 'PUBLIHSER' role by OpenVidu Server
  //         if (isPublisher(userName)) {
  //           // --- 6) Get your own camera stream ---

  //           var publisher = OV.initPublisher("video-container", {
  //             audioSource: undefined, // The source of audio. If undefined default microphone
  //             videoSource: undefined, // The source of video. If undefined default webcam
  //             publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //             publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //             resolution: "640x480", // The resolution of your video
  //             frameRate: 30, // The frame rate of your video
  //             insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
  //             mirror: false, // Whether to mirror your local video or not
  //           });

  //           // --- 7) Specify the actions when events take place in our publisher ---

  //           // When our HTML video has been added to DOM...
  //           publisher.on("videoElementCreated", (event) => {
  //             // Init the main video with ours and append our data
  //             var userData = {
  //               nickName: nickName,
  //               userName: userName,
  //             };
  //             initMainVideo(event.element, userData);
  //             appendUserData(event.element, userData);
  //             $(event.element).prop("muted", true); // Mute local video
  //           });

  //           // --- 8) Publish your stream ---

  //           session.publish(publisher);
  //         } else {
  //           console.warn("You don't have permissions to publish");
  //           initMainVideoThumbnail(); // Show SUBSCRIBER message in main video
  //         }
  //       })
  //       .catch((error) => {
  //         console.warn(
  //           "There was an error connecting to the session:",
  //           error.code,
  //           error.message
  //         );
  //       });
  //   });

  //   return false;
  // };

  return (
    <>
      <HeaderIngame />
      <Ready />
      <Waiting setIngame={setIngame} />
      <Play />
      <Result />
    </>
  );
};

export default Ingame;
