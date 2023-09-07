import { Outlet, useLocation } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";

function App() {
  const location = useLocation();
  const LOGIN_PAGE = location.pathname === "/";

  if (!LOGIN_PAGE)
    return (
      <GlobalStyles>
        <Outlet />
      </GlobalStyles>
    );
  else return <Outlet />;
}

export default App;
