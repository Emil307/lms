import { createContext } from "react";

export const MinimizedModeSidebarContext = createContext<{ isMinimizedModeSidebar: boolean; setIsMinimizedModeSidebar: (isMinimizedModeSidebar: boolean) => void }>({
    isMinimizedModeSidebar: false,
    setIsMinimizedModeSidebar: () => undefined,
});