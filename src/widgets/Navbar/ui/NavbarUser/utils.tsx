import { Folder, Heart, Search } from "react-feather";
import { ThemeIcon } from "@mantine/core";
import IconArticleBook from "public/icons/articleBook.svg";
import IconShoppingBag from "public/icons/shoppingBag.svg";
import { SidebarItemData } from "./components/SidebarMenu/types";

export const getSidebarItems = (isUserAuth: boolean) => {
    const items: SidebarItemData[] = [
        {
            label: "Мои курсы",
            href: { pathname: "/my-courses" },
            icon: <Folder />,
            isCheckRoute: "/my-courses",
        },
        {
            label: "База знаний",
            href: { pathname: "/articles" },
            icon: (
                <ThemeIcon>
                    <IconArticleBook />
                </ThemeIcon>
            ),
            isCheckRoute: "/articles",
        },
        {
            label: "Все курсы",
            href: { pathname: "/courses" },
            icon: (
                <ThemeIcon>
                    <IconShoppingBag />
                </ThemeIcon>
            ),
            isCheckRoute: "/support",
        },
    ];

    if (isUserAuth) {
        items.push({
            label: "Избранное",
            href: { pathname: "/my-courses/favorite" },
            icon: (
                <ThemeIcon color="dark">
                    <Heart />
                </ThemeIcon>
            ),
            isCheckRoute: "/my-courses/favorite",
        });
    }

    return items;
};

export const getSidebarPublicItems = (isUserAuth: boolean) => {
    const items: SidebarItemData[] = [
        {
            label: "Все курсы",
            href: { pathname: "/courses" },
            icon: <IconShoppingBag />,
            isCheckRoute: "/courses",
        },
        {
            label: "Поиск",
            href: { pathname: "/courses" },
            icon: (
                <ThemeIcon color="dark">
                    <Search />
                </ThemeIcon>
            ),
        },
    ];

    if (isUserAuth) {
        items.push({
            label: "Избранное",
            href: { pathname: "/my-courses/favorite" },
            icon: (
                <ThemeIcon color="dark">
                    <Heart />
                </ThemeIcon>
            ),
            isCheckRoute: "/my-courses/favorite",
        });
    }

    return items;
};
