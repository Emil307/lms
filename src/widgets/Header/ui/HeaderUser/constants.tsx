import { Route } from "nextjs-routes";
import { ReactNode } from "react";
import { Folder } from "react-feather";

import IconMessageDots from "public/icons/messageDots.svg";
import IconArticleBook from "public/icons/articleBook.svg";

export const menuLinks: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Мои курсы",
        href: { pathname: "/my-courses" },
        icon: <Folder />,
    },
    {
        label: "База знаний",
        href: { pathname: "/articles" },
        icon: <IconArticleBook />,
    },
    {
        label: "Поддержка",
        href: { pathname: "/support" },
        icon: <IconMessageDots />,
    },
];