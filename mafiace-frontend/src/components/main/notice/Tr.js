import React from "react";
import Td from "./Td";

const Tr = ({ list, handleRemove, handleEdit, handleDetail }) => {
  return (
    <tbody>
      {list.map((item) => {
        return (
          <Td
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
