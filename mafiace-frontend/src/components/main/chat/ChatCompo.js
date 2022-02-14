import React, { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
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
    setTypedMessage((prev) => "");
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
                <input
                  type="text"
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
                <button onClick={sendMsg}>Send</button>
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
        url="/mafiace/ws"
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
    </div>
  );
};

export default ChatCompo;
