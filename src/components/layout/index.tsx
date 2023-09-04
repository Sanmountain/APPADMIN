import { Outlet } from "react-router";
import Header from "./Header";
import { styled } from "styled-components";

export default function Layout() {
  return (
    <>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
}

const OutletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 130px;
  width: 100vw;
`;
