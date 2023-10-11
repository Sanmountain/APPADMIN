import { useLocation } from "react-router";
import Header from "./Header";
import { styled } from "styled-components";
import { ReactNode } from "react";
import { mediaQuery } from "../../styles/mediaQuery";

type ILayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ILayoutProps) {
  const titleName = {
    "/notice/list": "공지사항 목록",
    "/app/ver": "현재 버전 정보",
    "/app/scan": "스캔 사용자",
    "/app/deliveryTime": "배송시간 관리",
    "/app/paymentUser": "사용자 관리",
    "/app/product": "제품 사용내역",
    "/app/video": "영업소 App 영상 메뉴얼",
    "/mms/mmsSend": "MMS 전송내역",
    "/mms/talkSend": "알림톡 전송내역",
    "/mms/tracking": "MMS 추적",
    "/photoCheck": "Photo View",
  };

  const location = useLocation();

  const LOGIN_PAGE = location.pathname === "/";
  const USER_EDIT_PAGE = location.pathname === "/useredit";

  const currentTitle =
    titleName[location.pathname as keyof typeof titleName] || "";

  return (
    <>
      {!LOGIN_PAGE && <Header />}
      <OutletContainer>
        {!USER_EDIT_PAGE ? (
          <Outlet>
            {currentTitle ? <Title>{currentTitle}</Title> : <></>}
            {children}
          </Outlet>
        ) : (
          children
        )}
      </OutletContainer>
    </>
  );
}

const OutletContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 130px;
  width: 99vw;

  ${mediaQuery.small`
    margin-top: 0px;
    width: 100vw;
  `}
`;

const Outlet = styled.div`
  width: 85%;
  min-height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);

  ${mediaQuery.small`
    width: 98%;
    margin-left: 1%;
    margin-top: 50px;
  `}
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  font-size: 18px;
  font-weight: 800;
  color: #ff435e;
  padding: 20px;
`;
