import { useLocation } from "react-router";
import Header from "./Header";
import { styled } from "styled-components";
import { ReactNode } from "react";

type ILayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ILayoutProps) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <OutletContainer>{children}</OutletContainer>
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
