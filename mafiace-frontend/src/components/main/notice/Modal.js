import React, { useState } from "react";
import { Form, Input, TextArea } from "semantic-ui-react";

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
  const [edited, setEdited] = useState(selectedData);

  const onCancel = () => {
    handleCancel();
  };

  const onEditChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();
    handleEditSubmit(edited);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rouded shadow-lg w-10 md:w-2/5">
        <div
          className="text-xl font-bold  text-center"
          style={{ marginTop: "3%" }}
        >
          Update
        </div>
        <div className="border-b px-4 py-5 flex justify-center items-center"></div>
        <form>
          <br></br>
          <Form style={{ textAlign: "center" }}>
            <h3>Title</h3>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                type="text"
                name="title"
                value={edited.title}
                onChange={onEditChange}
                style={{ width: "70%" }}
              />
            </Form.Group>
            <h3>Content</h3>
            <Form.Group inline></Form.Group>
            <Form.Field
              control={TextArea}
              type="text"
              name="content"
              value={edited.content}
              onChange={onEditChange}
              style={{ width: "70%", height: "500px" }}
            />
          </Form>

          <div className="text-center">
            <button
              onClick={onSubmitEdit}
              // onClick={handleSubmit}
              className="bg-purple-300 hover:bg-purple-500 py-2 text-center px-10 md:px-12 md:py-3 text-white rounded text-xl md:text-base mt-4"
              style={{ margin: "5%" }}
            >
              저장
            </button>

            <button
              onClick={onCancel}
              className="bg-purple-300 hover:bg-purple-500 py-2 text-center px-10 md:px-12 md:py-3 text-white rounded text-xl md:text-base mt-4"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
