import UnknownPage from "./pages/404";
import ChangePw from "./pages/ChangePw";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";

export const routes = [
  { path: "/", element: <Main /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/change-password", element: <ChangePw /> },
  { path: "/unknown", element: <UnknownPage /> },
];
