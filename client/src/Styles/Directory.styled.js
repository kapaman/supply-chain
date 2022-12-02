import styled from "styled-components";

export const DirectoryHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: black;
  color: white;
  border-bottom: solid 5px #293def;
  height: 45px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18.48px;
  line-height: 28px;
  box-sizing: border-box;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 20px;
  text-decoration: none;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ collapsed }) => (collapsed ? "50px" : "320px")};
  transition: width 0.4s;
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const DirectoryBody = styled.div`
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  background: #f9f9f9;
  box-shadow: 0px 5.29065px 42.3252px rgba(26, 19, 70, 0.12);
  border-radius: 10.5813px;
  overflow-y: hidden;
`;

export const TableHeading = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-family: Poppins;
  color: #293def;
  flex: 0;
`;

export const TableSubHeading = styled.p`
  font-weight: 400;
  font-size: 14px;
  font-family: Poppins;
  color: #293def;
  margin-top: 5px;
  margin-bottom: 5px;
`;
