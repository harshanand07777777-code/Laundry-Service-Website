import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TrackPage from "./pages/TrackPage";
import StatusPage from "./pages/StatusPage";

export function createAppRouter(
  studentId: string,
  isLoggedIn: boolean,
  onLogin: (id: string) => void,
  onLogout: () => void
) {
  return createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn
        ? <Navigate to="/track" replace />
        : <LoginPage onLogin={onLogin} />,
    },
    {
      path: "/signup",
      element: isLoggedIn
        ? <Navigate to="/track" replace />
        : <SignUpPage onLogin={onLogin} />,
    },
    {
      path: "/track",
      element: isLoggedIn
        ? <TrackPage studentId={studentId} onLogout={onLogout} />
        : <Navigate to="/" replace />,
    },
    {
      path: "/status/:laundryNum",
      element: isLoggedIn
        ? <StatusPage onLogout={onLogout} />
        : <Navigate to="/" replace />,
    },
    {
      path: "*",
      element: <Navigate to={isLoggedIn ? "/track" : "/"} replace />,
    },
  ]);
}
