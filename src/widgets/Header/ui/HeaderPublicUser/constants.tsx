import { Route } from "nextjs-routes";
import { ReactNode } from "react";
import { IconBrandMessenger } from "@tabler/icons-react";
import { Folder } from "react-feather";

export const menuLinks: { label: string; href: Route; icon: ReactNode }[] = [
    {
        label: "Все курсы",
        href: { pathname: "/courses" },
        icon: <Folder />,
    },
    {
        label: "Консультация",
        href: { pathname: "/" },
        icon: <IconBrandMessenger />,
    },
];
