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
import Start from "./components/game/pages/Start";
import Prologue from "./components/game/pages/Prologue";
import FirstChapter from "./components/game/pages/FirstChapter";
import SecondChapter from "./components/game/pages/SecondChapter";
import ThirdChapter from "./components/game/pages/ThirdChapter";
import FourthChapter from "./components/game/pages/FourthChapter";
import FifthChapter from "./components/game/pages/FifthChapter";
import SixthChapter from "./components/game/pages/SixthChapter";
import SeventhChapter from "./components/game/pages/SeventhChapter";
import EighthChapter from "./components/game/pages/EighthChapter";
import NinthChapter from "./components/game/pages/NinthChapter";
import Epilogue from "./components/game/pages/Epilogue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
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
    ),
  },
  {
    path: "/first_chapter",
    element: (
      <ProtectedRoute>
        <FirstChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/second_chapter",
    element: (
      <ProtectedRoute>
        <SecondChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/third_chapter",
    element: (
      <ProtectedRoute>
        <ThirdChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/fourth_chapter",
    element: (
      <ProtectedRoute>
        <FourthChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/fifth_chapter",
    element: (
      <ProtectedRoute>
        <FifthChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sixth_chapter",
    element: (
      <ProtectedRoute>
        <SixthChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seventh_chapter",
    element: (
      <ProtectedRoute>
        <SeventhChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/eighth_chapter",
    element: (
      <ProtectedRoute>
        <EighthChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ninth_chapter",
    element: (
      <ProtectedRoute>
        <NinthChapter />
      </ProtectedRoute>
    ),
  },
  {
    path: "/epilogue",
    element: (
      <ProtectedRoute>
        <Epilogue />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AuthProvider>
      <Background />
      <RouterProvider router={router} />
    </AuthProvider>
  </ChakraProvider>
);
