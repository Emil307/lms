import { Route } from "nextjs-routes";
import { ReactNode } from "react";

export type SidebarItemData = {
    label: string;
    href: Route;
    icon: ReactNode;
    isCheckRoute?: string;
};
