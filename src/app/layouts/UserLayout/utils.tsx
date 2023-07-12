import { createContext } from "react";

export const SidebarMenuContext = createContext<{ openedSidebar: boolean; setOpenedSidebar: (isOpened: boolean) => void }>({
    openedSidebar: false,
    setOpenedSidebar: () => undefined,
});
