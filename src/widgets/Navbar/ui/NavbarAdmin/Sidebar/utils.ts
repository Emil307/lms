import { createContext } from "react";

export const SidebarAdminContext = createContext<{
    isMinimizedModeSidebar: boolean;
    setIsMinimizedModeSidebar: (isMinimizedModeSidebar: boolean) => void;
    activeSidebarItemsWithChildren: string[];
    setActiveSidebarItemsWithChildren: (values: string[]) => void;
}>({
    isMinimizedModeSidebar: false,
    setIsMinimizedModeSidebar: () => undefined,
    activeSidebarItemsWithChildren: [],
    setActiveSidebarItemsWithChildren: () => undefined,
});
