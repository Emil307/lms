import { useMantineTheme } from "@mantine/core";
import { route } from "nextjs-routes";
import { ReactNode } from "react";
import { Book, Settings, Layout, MessageCircle, Layers, Briefcase, Folder, User, Users } from "react-feather";

export type SidebarItems = { icon: ReactNode; label: string; href: string }[];

export function useSidebarItems(): SidebarItems {
    const theme = useMantineTheme();

    return [
        {
            label: "Домашние задания",
            icon: <Book color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
        {
            label: "Пользователи",
            icon: <User color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/users" }),
        },
        {
            label: "Ученики",
            icon: <Users color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/students" }),
        },
        {
            label: "Группы",
            icon: <Folder color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/groups" }),
        },
        {
            label: "База знаний",
            icon: <Briefcase color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/knowledge-base" }),
        },
        {
            label: "Курсы",
            icon: <Layers color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
        {
            label: "Аналитика",
            icon: <Book color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
        {
            label: "Сообщения",
            icon: <MessageCircle color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
        {
            label: "Страницы",
            icon: <Layout color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
        {
            label: "Настройки",
            icon: <Settings color={theme.colors.primary[9]} />,
            href: route({ pathname: "/admin/homework" }),
        },
    ];
}
