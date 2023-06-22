import { Route } from "nextjs-routes";
import { ReactNode } from "react";
import { Heart, LogOut, Settings, Zap } from "react-feather";

export const dropdownMenuItems: { id: number; icon: ReactNode; label: string; href: Route }[] = [
    { id: 1, icon: <Settings />, label: "Настройки профиля", href: { pathname: "/profile" } },
    //TODO: поменять урл
    { id: 2, icon: <Zap />, label: "Активные курсы", href: { pathname: "/courses", query: { isActive: "1" } } },
    { id: 3, icon: <Heart />, label: "Избранные статьи", href: { pathname: "/articles", query: { tab: "favorite" } } },
    { id: 4, icon: <LogOut />, label: "Выйти", href: { pathname: "/logout" } },
];
