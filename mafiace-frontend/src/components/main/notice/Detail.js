import React from "react";
import { Container, Header, TextArea, Form } from "semantic-ui-react";

const Detail = ({ selectedData, handleCancel3 }) => {
  const onCancel = () => {
    handleCancel3();
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <Container text>
        <div
          className="bg-white rouded shadow-lg items-center"
          style={{ marginTop: "10%", borderRadius: "10px" }}
        >
          <button
            onClick={onCancel}
            className="bg-purple-300 hover:bg-purple-500 px-2 rounded text-white "
            style={{ margin: "1%", border: "none" }}
          >
            X
          </button>
          <div className=" w-100 border-t p-3">
            <Header style={{ textAlign: "center" }}>
              {selectedData.title}
            </Header>
            <hr></hr>
            {/* <div
              style={{
                border: "1px solid #A390EE",
                padding: "5%",
                borderRadius: "7px",
              }}
            >
              {selectedData.content}
            </div>
            <div
              style={{
                border: "1px solid white",
                padding: "1%",
                borderRadius: "10px",
                marginTop: "3%",
                textAlign: "right",
              }}
            >
              {selectedData.postTime}
            </div> */}
            <form>
              <div
                style={{
                  border: "1px solid white",
                  padding: "1%",
                  borderRadius: "10px",
                  marginTop: "3%",
                  textAlign: "right",
                }}
              >
                {selectedData.postTime}
              </div>
              <Form style={{ textAlign: "center", marginBottom: "5%" }}>
                <h3>Content</h3>
                <Form.Group inline></Form.Group>
                <Form.Field
                  control={TextArea}
                  type="text"
                  name="content"
                  value={selectedData.content}
                  style={{ width: "70%", height: "500px" }}
                />
              </Form>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Detail;
