import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import { styled } from "styled-components";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}
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
