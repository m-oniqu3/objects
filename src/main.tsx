import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Modal from "./components/Modal.tsx";
import { AuthContextProvider } from "./contexts/auth/AuthContextProvider.tsx";
import ModalProvider from "./contexts/modal/provider.tsx";
import "./index.css";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import EditStory from "./pages/EditStory.tsx";
import Home from "./pages/Home.tsx";
import Stories from "./pages/Stories.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ModalProvider>
          <Modal />
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<Stories />} />
            </Route>

            <Route path="/s/:id/edit" element={<EditStory />} />

            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
          </Routes>
        </ModalProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
