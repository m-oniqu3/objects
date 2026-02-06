import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthContextProvider } from "./contexts/AuthContextProvider.tsx";
import "./index.css";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import Home from "./pages/Home.tsx";
import New from "./pages/New.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
          </Route>

          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
