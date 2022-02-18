import React from "react";
import Td from "./Td";

const Tr = ({ admin, list, handleRemove, handleEdit, handleDetail }) => {
  return (
    <tbody>
      {list.map((item) => {
        return (
          <Td
            admin={admin}
            key={item.postNum}
            item={item}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            handleDetail={handleDetail}
          />
        );
      })}
    </tbody>
  );
};

export default Tr;
