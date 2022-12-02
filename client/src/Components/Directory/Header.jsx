import React from "react";
import { DirectoryHeader, ToggleButton } from "../../Styles/Directory.styled";
import { ReactComponent as Left } from "../../img/left.svg";
import { ReactComponent as WorkSpace } from "../../img/workspace.svg";

const Header = ({ collapsed, setCollapsed }) => {
  if (collapsed)
    return (
      <DirectoryHeader collapsed={collapsed}>
        <WorkSpace
          style={{ cursor: "pointer" }}
          onClick={() => setCollapsed(false)}
        />
      </DirectoryHeader>
    );

  return (
    <DirectoryHeader collapsed={collapsed}>
      <p>Items</p>
      <ToggleButton
        collapsed={collapsed}
        onClick={() => {
          setCollapsed(true);
        }}
      >
        <Left />
      </ToggleButton>
    </DirectoryHeader>
  );
};

export default Header;
