import React, { useEffect, useState } from "react";
import {
  Header,
  HeaderWrapper,
  PrimaryButton,
  Wrapper,
} from "../../Styles/WorkArea.styled";
import Body from "./Body";
import CreateItem from "./CreateItem";
import DeliverItem from "./DeliverItem";
import SellItem from "./SellItem";

const WorkArea = ({ functions }) => {
  return (
    <Wrapper
      style={{
        marginLeft: "20px",
        boxSizing: "border-box",
        position: "relative",
        gap: "1rem",
      }}
    >
      <div style={{ width: "50%" }}>
        <CreateItem handle={functions.handleCreate}></CreateItem>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>
          <SellItem handle={functions.handlePaid}></SellItem>
        </div>
        <div>
          <DeliverItem handle={functions.handleDeliver}></DeliverItem>
        </div>
      </div>
    </Wrapper>
  );
};

export default WorkArea;
