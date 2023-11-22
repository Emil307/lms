import { createContext } from "react";

export const SidebarItemsWithChildrenContext = createContext<{
    activeSidebarItemsWithChildren: string[];
    setActiveSidebarItemsWithChildren: (values: string[]) => void;
}>({
    activeSidebarItemsWithChildren: [],
    setActiveSidebarItemsWithChildren: () => undefined,
});
