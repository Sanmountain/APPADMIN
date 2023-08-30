import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import NoticeList from "../pages/notice/NoticeList";
import NoticeWrite from "../pages/notice/NoticeWrite";
import AppTitle from "../pages/appSet/AppTitle";
import AppVer from "../pages/appSet/AppVer";
import AppScan from "../pages/appSet/appScan/AppScan";
import AppVideo from "../pages/appSet/AppVideo";
import MMSSend from "../pages/mms/MMSSend";
import TalkSend from "../pages/mms/TalkSend";
import PhotoCheck from "../pages/PhotoCheck";
import UserEdit from "../pages/UserEdit";
import Layout from "../components/layout";
import NoticeDetail from "../pages/notice/NoticeDetail";
import AppScanDetail from "../pages/appSet/appScan/AppScanDetail";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    path: "/notice",
    element: <Layout />,
    children: [
      { path: "/notice/list", element: <NoticeList /> },
      { path: "/notice/:noticeId", element: <NoticeDetail /> },
      { path: "/notice/write", element: <NoticeWrite /> },
      { path: "/notice/:noticeId/edit", element: <NoticeWrite /> },
    ],
  },

  {
    path: "/app",
    element: <Layout />,
    children: [
      { path: "/app/title", element: <AppTitle /> },
      { path: "/app/ver", element: <AppVer /> },
      { path: "/app/scan", element: <AppScan /> },
      { path: "/app/scan/:scanDate", element: <AppScanDetail /> },
      { path: "/app/video", element: <AppVideo /> },
    ],
  },

  {
    path: "/mms",
    element: <Layout />,
    children: [
      { path: "/mms/mmsSend", element: <MMSSend /> },
      { path: "/mms/talkSend", element: <TalkSend /> },
    ],
  },

  {
    path: "/photoCheck",
    element: <Layout />,
    children: [{ path: "/photoCheck", element: <PhotoCheck /> }],
  },

  {
    path: "/userEdit",
    element: <Layout />,
    children: [{ path: "/userEdit", element: <UserEdit /> }],
  },
]);
