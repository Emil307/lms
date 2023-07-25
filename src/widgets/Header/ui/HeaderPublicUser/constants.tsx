import { Route } from "nextjs-routes";
import React, { ReactNode } from "react";
import { Folder, Heart } from "react-feather";

export const menuLinks: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
        icon: <Folder />,
    },
];

export const extraMenuLinks: { href: Route; icon: ReactNode }[] = [
    {
        href: { pathname: "/courses/favorite" },
        icon: <Heart />,
    },
];
