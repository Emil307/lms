import { useRouter } from "next/router";
import { createContext } from "react";
import { isPathIncluded } from "@app/routes";
import { PATHS_WITH_WIDE_LAYOUT } from "./constants";

export const SidebarMenuContext = createContext<{ openedSidebar: boolean; setOpenedSidebar: (isOpened: boolean) => void }>({
    openedSidebar: false,
    setOpenedSidebar: () => undefined,
});

export const useWideLayout = () => {
    const router = useRouter();

    return isPathIncluded(PATHS_WITH_WIDE_LAYOUT, router.pathname);
};
