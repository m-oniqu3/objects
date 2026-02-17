import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Modal from "./components/Modal.tsx";
import { AuthContextProvider } from "./contexts/auth/AuthContextProvider.tsx";
import ModalProvider from "./contexts/modal/provider.tsx";
import PromptContextProvider from "./contexts/prompt/provider.tsx";
import "./index.css";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import Editor from "./pages/Editor.tsx";
import Home from "./pages/Home.tsx";
import Prompt from "./pages/Prompt.tsx";
import Prompts from "./pages/Prompts.tsx";
import Stories from "./pages/Stories.tsx";
import Story from "./pages/Story.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ModalProvider>
          <PromptContextProvider>
            <Modal />
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/s/:slug" element={<Story />} />

                <Route path="/prompts" element={<Prompts />} />
                <Route path="/p/:id" element={<Prompt />} />
              </Route>

              <Route path="/edit/:id" element={<Editor />} />

              <Route path="/sign_in" element={<SignIn />} />
              <Route path="/sign_up" element={<SignUp />} />
            </Routes>
          </PromptContextProvider>
        </ModalProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
