import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./components/context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import "./index.css";
import Background from "./components/shared/Background";
import Login from "./components/auth/pages/Login";
import Registration from "./components/auth/pages/Registration";
import App from "./App";
import Start from "./components/game/pages/Start";
import Prologue from "./components/game/pages/Prologue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // TODO <Login/>
  },
  {
    path: "/registration",
    element: <Registration />, // TODO <Registration/>
  },
  {
    path: "/start",
    element: (
      <ProtectedRoute>
        <Start />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prologue",
    element: (
      <ProtectedRoute>
        <Prologue />
      </ProtectedRoute>
    ), // TODO <Prologue/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Background />
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
