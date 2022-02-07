import React from "react";

const Td = ({ admin, item, handleRemove, handleEdit, handleDetail }) => {
  const onRemove = () => {
    handleRemove(item.postNum);
  };

  const onEdit = () => {
    handleEdit(item);
  };

  const onDetail = () => {
    handleDetail(item);
  };

  return (
    <>
      {admin === "sixman" ? (
        <div>
          <tr className="bg-white border-2 border-gray-200">
            <td>
              <p
                className="px-4 py-3 cursor-pointer hover:text-blue-300 "
                onClick={onDetail}
              >
                {item.postNum}
              </p>
            </td>
            <td>
              <p
                className="px-4 py-3 cursor-pointer hover:text-blue-300"
                onClick={onDetail}
              >
                {item.title}
              </p>
            </td>
            <td className="px-4 py-3">{item.postTime}</td>
            {/* <td className="px-4 py-3">{item.content}</td> */}

            <td className="text-center">
              <button
                className="far fa-edit px-4 py-3  text-purple-400 cursor-pointer show-modal"
                onClick={onEdit}
              >
                수정
              </button>
            </td>
            <td className="text-center ">
              <button
                onClick={onRemove}
                className="far fa-trash-alt px-4 py-3 text-purple-400 cursor-pointer"
              >
                삭제
              </button>
            </td>
          </tr>
        </div>
      ) : (
        <tr
          className="bg-white border-2 border-gray-200"
          style={{ textAlign: "center" }}
        >
          <td>
            <p
              className="px-4 py-3 cursor-pointer hover:text-blue-300 "
              onClick={onDetail}
            >
              {item.postNum}
            </p>
          </td>
          <td>
            <p
              className="px-4 py-3 cursor-pointer hover:text-blue-300"
              onClick={onDetail}
            >
              {item.title}
            </p>
          </td>
          <td className="px-4 py-3">{item.postTime}</td>
        </tr>
      )}
    </>
  );
};
export default Td;
