import { Route } from "nextjs-routes";
import { ReactNode } from "react";
import { Folder } from "react-feather";

import IconMessageDots from "public/icons/messageDots.svg";
import IconArticleBook from "public/icons/articleBook.svg";

export const menuLinks: { label: string; href: Route; icon: ReactNode; isCheckRoute: string }[] = [
    {
        label: "Мои курсы",
        href: { pathname: "/my-courses" },
        icon: <Folder />,
        isCheckRoute: "/my-courses",
    },
    {
        label: "База знаний",
        href: { pathname: "/articles" },
        icon: <IconArticleBook />,
        isCheckRoute: "/articles",
    },
    {
        label: "Поддержка",
        href: { pathname: "/support" },
        icon: <IconMessageDots />,
        isCheckRoute: "/support",
    },
];
