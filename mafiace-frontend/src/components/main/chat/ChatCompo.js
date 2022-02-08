import React, { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./MessageStyle.css";
import jwt from "jwt-decode";

const ChatCompo = () => {
  const $websocket = useRef(null);
  const messageBoxRef = useRef();
  let [messages, setMessages] = useState([]);
  let [typedMessage, setTypedMessage] = useState("");
  let name = jwt(localStorage.getItem("jwt")).sub;
  let topics = ["/topic/user"];

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMsg = () => {
    $websocket.current.sendMessage(
      "/app/send",
      JSON.stringify({
        name: name,
        message: typedMessage,
        to: "user",
      })
    );
    setTypedMessage("");
  };

  return (
    <div>
      <div className="align-center">
        <h1>채팅</h1>
        <br />
        <br />
      </div>
      <div className="align-center">
        <p className="title1"> User : {name}</p>
      </div>

      <div className="align-center">
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <TextField
                  id="outlined-basic"
                  label="메세지를 입력해주세요."
                  variant="outlined"
                  value={typedMessage}
                  onChange={(event) => {
                    setTypedMessage(event.target.value);
                  }}
                />
              </td>

              <td>
                <Button variant="contained" color="inherit" onClick={sendMsg}>
                  Send
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className="align-center scrollbar" ref={messageBoxRef}>
        <div className="chatbox">
          {messages.map((msg, index) => {
            return (
              <div key={index}>
                {name === msg.name ? (
                  <div className="chat" key={msg.name}>
                    <span className="title1">{msg.name} : </span>
                    <span className="message">{msg.message}</span>
                  </div>
                ) : (
                  <div className="chat" key={msg.name}>
                    <span className="title2">{msg.name} : </span>
                    <span className="message">{msg.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SockJsClient
        url="http://localhost:8080/mafiace/chat/"
        topics={topics}
        onConnect={() => {
          console.log("Connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          setMessages((prev) => [...prev, msg]);
        }}
        ref={$websocket}
      />
      <h1>Footer</h1>
    </div>
  );
};

export default ChatCompo;
