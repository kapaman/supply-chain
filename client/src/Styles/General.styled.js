import styled from "styled-components";
// ${({ height }) => height + "rem"}

export const Navbar = styled.div`
  width: 100%;
  background: black;
  border-bottom: 5px solid #293def;
  height: 50px;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 29px;
  color: #ffffff;
`;

export const Main = styled.div`
  max-width: 1240px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 1rem;
`;
