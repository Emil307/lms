import { Folder, Heart, Search } from "react-feather";
import { ThemeIcon } from "@mantine/core";
import { IconBrandMessenger } from "@tabler/icons-react";
import IconMessageDots from "public/icons/messageDots.svg";
import IconArticleBook from "public/icons/articleBook.svg";
import { SidebarItemData } from "./components/SidebarMenu/types";

export const sidebarItems: SidebarItemData[] = [
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
        label: "Поддержка",
        href: { pathname: "/support" },
        icon: (
            <ThemeIcon>
                <IconMessageDots />
            </ThemeIcon>
        ),
        isCheckRoute: "/support",
    },
];

export const sidebarPublicItems: SidebarItemData[] = [
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
        icon: <Folder />,
        isCheckRoute: "/courses",
    },
    //TODO: Поменять рут
    {
        label: "Консультация",
        href: { pathname: "/" },
        icon: <IconBrandMessenger />,
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
    {
        label: "Избранное",
        href: { pathname: "/courses/favorite" },
        icon: (
            <ThemeIcon color="dark">
                <Heart />
            </ThemeIcon>
        ),
        isCheckRoute: "/courses/favorite",
    },
];
