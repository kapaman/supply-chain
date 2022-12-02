import React, { useState } from "react";
import { ReactComponent as Down } from "../img/down.svg";
import { ReactComponent as Up } from "../img/up.svg";
import {
  Icon,
  NameAndRecords,
  PreviewWrapper,
  TableKeysTile,
  TableName,
  TableTiles,
  TileWrapper,
} from "../Styles/Keys.styled";

const PreviewTableKeys = ({ expanded, keys }) => {
  return (
    <PreviewWrapper expanded={expanded}>
      <TableKeysTile>Items</TableKeysTile>
      <div style={{ width: "100%", overflowY: "scroll" }}>
        {keys.map((key, i) => (
          <TableTiles key={i}>
            <p>{key.name} </p>
            <p>{key.id} </p>
          </TableTiles>
        ))}
      </div>
    </PreviewWrapper>
  );
};

const Keys = ({ name, keys, records, setRunQuery }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TileWrapper>
        <NameAndRecords>
          <TableName>{name}</TableName>
          <p>{records}</p>
        </NameAndRecords>
        <Icon onClick={() => setExpanded(!expanded)}>
          {expanded ? <Up></Up> : <Down></Down>}
        </Icon>
      </TileWrapper>
      <PreviewTableKeys expanded={expanded} keys={keys} />
    </>
  );
};

export default Keys;
