import { Heart, LogOut, Settings, Zap, Airplay } from "react-feather";
import { logoutPath } from "@app/routes";
import Bill from "public/icons/bill.svg";
import { RoleName, Roles } from "@shared/types";

interface GetMenuItemsProps {
    userRole: RoleName;
}

export const getMenuItems = ({ userRole }: GetMenuItemsProps) => {
    const items = [];

    if (userRole !== Roles.student) {
        items.push({ icon: <Airplay />, label: "Админ-панель", href: { pathname: "/admin" } });
    }

    items.push(
        { icon: <Settings />, label: "Настройки профиля", href: { pathname: "/profile" } },
        { icon: <Zap />, label: "Активные курсы", href: { pathname: "/my-courses" } },
        { icon: <Heart />, label: "Избранные статьи", href: { pathname: "/articles", query: { tab: "favorite" } } },
        { icon: <Bill />, label: "Мои покупки", href: { pathname: "/transactions" } },
        { icon: <LogOut />, label: "Выйти", href: { pathname: logoutPath } }
    );

    return items;
};
