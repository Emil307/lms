import React from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Book, Folder, Settings, User, Users } from "react-feather";
import { useMantineTheme } from "@mantine/core";
import SidebarItem from "./UI/SidebarItem/SidebarItem";
import SidebarItemWithChildren from "./UI/SidebarItemWithChildren/SidebarItemWithChildren";

export default function Sidebar() {
    const router = useRouter();
    const theme = useMantineTheme();
    return (
        <Box>
            <SidebarItem
                label="UI"
                isActive={router.pathname.includes("/admin/homework")}
                icon={<Book color={theme.colors.primary[9]} />}
                href="/ui"
            />
            <SidebarItem
                label="Пользователи"
                isActive={router.pathname.includes("/admin/users")}
                icon={<User color={theme.colors.primary[9]} />}
                href="/admin/users"
            />
            <SidebarItem
                label="Ученики"
                isActive={router.pathname.includes("/admin/students")}
                icon={<Users color={theme.colors.primary[9]} />}
                href="/admin/students"
            />
            <SidebarItem
                label="Группы"
                isActive={router.pathname.includes("/admin/groups")}
                icon={<Folder color={theme.colors.primary[9]} />}
                href="/admin/groups"
            />

            <SidebarItemWithChildren
                roles={["ADMIN"]}
                label="Настройки"
                isActive={router.pathname.includes("/admin/settings")}
                icon={<Settings color={theme.colors.primary[9]} />}>
                <SidebarItem
                    inner={true}
                    label="Теги"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/tags"
                    isActive={router.pathname.includes("/admin/settings/tags")}
                />
            </SidebarItemWithChildren>
        </Box>
    );
}
