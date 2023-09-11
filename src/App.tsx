import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";

function App() {
  const location = useLocation();

  const LOGIN_PAGE = location.pathname === "/";
  const USER_EDIT_PAGE = location.pathname === "/useredit";

  if (!LOGIN_PAGE || !USER_EDIT_PAGE)
    return (
      <GlobalStyles>
        <Outlet />
      </GlobalStyles>
    );
  else return <Outlet />;
}

export default App;
