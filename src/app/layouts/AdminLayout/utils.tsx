import { createContext } from "react";

export const AdminSidebarMenuContext = createContext<{ openedSidebar: boolean; setOpenedSidebar: (isOpened: boolean) => void }>({
    openedSidebar: false,
    setOpenedSidebar: () => undefined,
});
