import React from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Book, Briefcase, Settings, User } from "react-feather";
import { useMantineTheme } from "@mantine/core";
import SidebarItem from "./UI/SidebarItem/SidebarItem";
import SidebarItemWithChildren from "./UI/SidebarItemWithChildren/SidebarItemWithChildren";

export default function Sidebar() {
    const router = useRouter();
    const theme = useMantineTheme();
    return (
        <Box>
            <SidebarItem
                label="Домашнее задание"
                isActive={router.pathname.includes("/admin/homework")}
                icon={<Book color={theme.colors.primary[9]} />}
                href="/admin/homework"
            />
            <SidebarItem
                label="Пользователи"
                isActive={router.pathname.includes("/admin/users")}
                icon={<User color={theme.colors.primary[9]} />}
                href="/admin/users"
            />

            <SidebarItemWithChildren
                label="Настройки"
                isActive={router.pathname.includes("/admin/groups")}
                icon={<Settings color={theme.colors.primary[9]} />}>
                <SidebarItem
                    inner={true}
                    label="Тэги"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/groups"
                    isActive={router.pathname.includes("/admin/groups")}
                />
            </SidebarItemWithChildren>

            <SidebarItemWithChildren
                roles={["Admin"]}
                label="База знаний"
                isActive={router.pathname.includes("/admin/knowledge-base")}
                icon={<Briefcase color={theme.colors.primary[9]} />}>
                <SidebarItem
                    inner={true}
                    label="Знания 1"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/knowledge-base"
                    isActive={router.pathname.includes("/admin/knowledge-base")}
                />
                <SidebarItem inner={true} label="Знания 2" icon={<User color={theme.colors.primary[9]} />} href="/admin/homework" />
                <SidebarItem inner={true} label="Знания 3" icon={<User color={theme.colors.primary[9]} />} href="/admin/homework" />
            </SidebarItemWithChildren>
        </Box>
    );
}
