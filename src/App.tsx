import { useState, useMemo } from "react";
import { RouterProvider } from "react-router";
import { createAppRouter } from "./routes";

export default function App() {
  const [studentId, setStudentId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLogin(id: string) {
    setStudentId(id);
    setIsLoggedIn(true);
  }

  function onLogout() {
    setStudentId("");
    setIsLoggedIn(false);
  }

  const router = useMemo(
    () => createAppRouter(studentId, isLoggedIn, onLogin, onLogout),
    [studentId, isLoggedIn]
  );

  return <RouterProvider router={router} />;
}
