import styled from "styled-components";
// ${({ height }) => height + "rem"}
export const Header = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ active }) => (active ? "black" : "#EFEFEF")};
  color: ${({ active }) => (active ? "white" : "#767676DB")};
  border-bottom: ${({ active }) => (active ? "solid 5px #293DEF" : "none")};
  height: 45px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18.48px;
  line-height: 28px;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  // flex-grow: 1;
`;

export const WorkspaceBody = styled.div`
  width: 100%;
  height: ${({ mini }) => (mini ? "220px" : "500px")};
  box-sizing: border-box;
  padding: 20px;
  display: relative;
  background: #f9f9f9;
  box-shadow: 0px 5.29065px 42.3252px rgba(26, 19, 70, 0.12);
  border-radius: 10.5813px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextArea = styled.textarea`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4.5px;
  box-sizing: border-box;
  width: 100%;
  height: 85%;
  padding: 20px;
`;

export const PrimaryButton = styled.button`
  width: 120px;
  height: 40px;
  background: #293def;
  border: 1.5px solid #1a2ee3;
  border-radius: 4px;
  color: white;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
`;

export const ResetButton = styled.div`
  margin-left: 20px;
  width: 120px;
  background: white;
  border: 1.5px solid #1a2ee3;
  border-radius: 4px;
  color: #3347fc;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ExportButton = styled.button`
  width: 120px;
  background: #293def;
  border: 1.5px solid #1a2ee3;
  border-radius: 4px;
  color: white;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
`;
