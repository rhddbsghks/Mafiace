import React from "react";
import "./notice.css";
import { Container, Header } from "semantic-ui-react";

const Modal = ({ selectedData, handleCancel3 }) => {
  const onCancel = () => {
    handleCancel3();
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      {/* <div
        className="bg-white rouded shadow-lg"
        style={{ width: "50%", height: "50%" }}
      >
        <div className="flex justify-end items-center w-100 border-t p-3">
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white"
          >
            X
          </button>
        </div>
        <div className="border-b  flex justify-between items-center">
          <h3 className="font-bold text-lg">{selectedData.title}</h3>
        </div>
        <form>
          <div
            style={{
              margin: "20px",
              height: "50%",
              width: "70%",
            }}
          >
            {selectedData.content}
          </div>
          <div>{selectedData.postTime}</div>
        </form>
      </div> */}

      <Container text>
        <div className="bg-white rouded shadow-lg">
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 px-1 py-1/2 rounded text-white"
          >
            X
          </button>
          <div className=" w-100 border-t p-3">
            <Header>{selectedData.title}</Header>
            <hr></hr>
            <div
              style={{
                border: "1px solid gray",
                padding: "5%",
                borderRadius: "10px",
              }}
            >
              {selectedData.content}
            </div>
            <div
              style={{
                border: "1px solid gray",
                padding: "1%",
                borderRadius: "10px",
                marginTop: "3%",
              }}
            >
              {selectedData.postTime}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Modal;
