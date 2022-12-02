import React, { useState } from "react";
import { Wrapper } from "../../Styles/Directory.styled";
import Body from "./Body";
import Header from "./Header";

const Directory = ({ setRunQuery, status }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper collapsed={collapsed}>
      <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
      <Body
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        overviewData={status}
        setRunQuery={setRunQuery}
      ></Body>
    </Wrapper>
  );
};

export default Directory;
