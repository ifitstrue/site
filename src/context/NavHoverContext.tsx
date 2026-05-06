"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NavHoverContextType = {
  hoveredLink: string | null;
  setHoveredLink: (link: string | null) => void;
};

const NavHoverContext = createContext<NavHoverContextType | undefined>(undefined);

export function NavHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <NavHoverContext.Provider value={{ hoveredLink, setHoveredLink }}>
      {children}
    </NavHoverContext.Provider>
  );
}

export function useNavHover() {
  const context = useContext(NavHoverContext);
  if (context === undefined) {
    throw new Error("useNavHover must be used within a NavHoverProvider");
  }
  return context;
}
