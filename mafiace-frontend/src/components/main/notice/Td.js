import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";

const Td = ({ item, handleRemove, handleEdit, handleDetail }) => {
  const [admin, setAdmin] = useState("");

  const onRemove = () => {
    handleRemove(item.postNum);
  };

  const onEdit = () => {
    handleEdit(item);
  };

  const onDetail = () => {
    handleDetail(item);
  };
  useEffect(() => {
    const admin_storage = jwt(localStorage.getItem("jwt"));
    setAdmin(admin_storage.sub);
    // console.log(admin);
  }, []);

  return (
    <>
      <tr
        className="bg-white border-2 border-gray-200"
        style={{ textAlign: "center" }}
      >
        <td className="px-4 py-3">
          <p
            className="hover:text-blue-500 cursor-pointer"
            style={{ fontSize: "150%" }}
            onClick={onDetail}
          >
            {item.postNum}
          </p>
        </td>
        <td className="px-4 py-3">
          <p
            className="hover:text-blue-500 cursor-pointer"
            style={{ fontSize: "150%" }}
            onClick={onDetail}
          >
            {item.title}
          </p>
        </td>
        <td className="px-4 py-3" style={{ fontSize: "150%" }}>
          {item.postTime}
        </td>
        {admin === "sixman" ? (
          <>
            <td
              className="text-center text-purple-400 cursor-pointer show-modal hover:text-purple-700"
              onClick={onEdit}
            >
              <i className="far fa-edit">수정</i>
            </td>

            <td
              onClick={onRemove}
              className="text-center text-purple-400 cursor-pointer hover:text-purple-700"
            >
              <i className="far fa-trash-alt">삭제</i>
            </td>
          </>
        ) : null}
      </tr>
    </>
  );
};

export default Td;
