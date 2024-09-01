import { Route } from "nextjs-routes";
import { ReactNode } from "react";
import IconFolder from "public/icons/folder2.svg";
import IconShoppingBag from "public/icons/shoppingBag.svg";
import IconArticleBook from "public/icons/articleBook.svg";

export const NAVBAR_MENU_ITEMS: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Мои курсы",
        href: { pathname: "/my-courses" },
        icon: <IconFolder />,
    },
    {
        label: "База знаний",
        href: { pathname: "/articles" },
        icon: <IconArticleBook />,
    },
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
        icon: <IconShoppingBag />,
    },
];
