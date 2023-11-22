import { createContext } from "react";

export const SidebarMinimizedModeContext = createContext<{
    isMinimizedModeSidebar: boolean;
    setIsMinimizedModeSidebar: (isMinimizedModeSidebar: boolean) => void;
}>({
    isMinimizedModeSidebar: false,
    setIsMinimizedModeSidebar: () => undefined,
});
