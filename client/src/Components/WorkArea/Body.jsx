import React, { Children } from "react";
import {
  WorkspaceBody,
  ButtonWrapper,
  PrimaryButton,
  ResetButton,
  TextArea,
} from "../../Styles/WorkArea.styled";
import Results from "../Results";

const Body = ({
  resultSection,
  tableName,
  database,
  setQuery,
  query,
  handleRun,
  mini,
  children,
}) => {
  if (resultSection === true) {
    return (
      <WorkspaceBody>
        <Results
          style={{
            border: "1px solid #E8E1ED",
          }}
          database={database}
          tableName={tableName}
        ></Results>
      </WorkspaceBody>
    );
  }

  return <WorkspaceBody mini={mini}>{children}</WorkspaceBody>;
};

export default Body;
