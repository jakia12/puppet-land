// components/
"use client";

import { createContext, useCallback, useContext, useState } from "react";
import DraggablePuppetsModal from "./DraggablePuppetsModal";

const ModalCtx = createContext(null);
export const useModal = () => useContext(ModalCtx);

export default function ModalProvider({ children }) {
  const [puppetsOpen, setPuppetsOpen] = useState(false);

  const openPuppets = useCallback(() => setPuppetsOpen(true), []);
  const closePuppets = useCallback(() => setPuppetsOpen(false), []);

  return (
    <ModalCtx.Provider value={{ puppetsOpen, openPuppets, closePuppets }}>
      {children}
      {/* Keep the modal mounted here so it can open from anywhere */}
      <DraggablePuppetsModal open={puppetsOpen} onClose={closePuppets} />
    </ModalCtx.Provider>
  );
}
