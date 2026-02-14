import { useReducer, type ReactNode } from "react";
import type { Modal } from "../../types/modal";
import { ModalActionTypes } from "./actions";
import ModalContext from "./context";
import { initialState, modalReducer } from "./reducer";

// Define the props type for the context provider component
type ContextProviderProps = {
  children: ReactNode;
};

function ModalProvider({ children }: ContextProviderProps) {
  // useReducer hook to manage state with our reducer function and initial state
  const [state, dispatch] = useReducer(modalReducer, initialState);

  function openModal(payload: Modal) {
    dispatch({
      type: ModalActionTypes.OPEN_MODAL,
      payload,
    });
  }

  function closeModal() {
    dispatch({ type: ModalActionTypes.CLOSE_MODAL });
  }

  function stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
  }

  return (
    <ModalContext.Provider
      value={{
        dispatch,
        state,
        openModal,
        closeModal,
        stopPropagation,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
