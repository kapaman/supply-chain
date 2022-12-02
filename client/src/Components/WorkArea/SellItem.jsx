import React, { useEffect, useState } from "react";
import {
  Header,
  HeaderWrapper,
  PrimaryButton,
  Wrapper,
} from "../../Styles/WorkArea.styled";
import Body from "./Body";

const Sellitem = ({ handle }) => {
  const [idx, setIdx] = useState();
  return (
    <>
      <HeaderWrapper>
        <Header active={true}>Mark Item as Sold</Header>
      </HeaderWrapper>
      <Body mini={true}>
        <p style={{ color: "#0007CA", fontWeight: "500", fontSize: "18px" }}>
          Item Id
        </p>
        <input
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(170, 170, 170, 0.57)",
            height: "40px",
            width: "300px",
            borderRadius: "10px",
          }}
          onChange={(e) => setIdx(e.target.value)}
        ></input>
        <PrimaryButton onClick={() => handle(idx)}>sold</PrimaryButton>
      </Body>
    </>
  );
};

export default Sellitem;
