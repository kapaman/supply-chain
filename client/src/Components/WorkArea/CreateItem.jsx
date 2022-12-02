import React, { useEffect, useState } from "react";
import {
  Header,
  HeaderWrapper,
  PrimaryButton,
  Wrapper,
} from "../../Styles/WorkArea.styled";
import Body from "./Body";

const CreateItem = ({ handle }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  return (
    <>
      <HeaderWrapper>
        <Header active={true}>Create Item</Header>
      </HeaderWrapper>
      <Body>
        <p style={{ color: "#0007CA", fontWeight: "500", fontSize: "18px" }}>
          Item Name
        </p>
        <input
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(170, 170, 170, 0.57)",
            height: "40px",
            width: "300px",
            borderRadius: "10px",
          }}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p style={{ color: "#0007CA", fontWeight: "500", fontSize: "18px" }}>
          Item Price
        </p>
        <input
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(170, 170, 170, 0.57)",
            height: "40px",
            width: "300px",
            borderRadius: "10px",
          }}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <PrimaryButton onClick={() => handle(name, price)}>
          create
        </PrimaryButton>
      </Body>
    </>
  );
};

export default CreateItem;
