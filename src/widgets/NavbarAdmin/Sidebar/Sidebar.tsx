import React from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Book, Briefcase, Folder, Settings, User, Users } from "react-feather";
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
            <SidebarItem
                label="База знаний"
                isActive={router.pathname.includes("/admin/articles")}
                icon={<Briefcase color={theme.colors.primary[9]} />}
                href="/admin/articles"
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
                <SidebarItem
                    inner={true}
                    label="Категории курсов"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/categories"
                    isActive={router.pathname.includes("/admin/settings/categories")}
                />
                <SidebarItem
                    inner={true}
                    label="Авторы курсов"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/authors"
                    isActive={router.pathname.includes("/admin/settings/authors")}
                />
                <SidebarItem
                    inner={true}
                    label="Справочник материалов"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/materials"
                    isActive={router.pathname.includes("/admin/settings/materials")}
                />
                <SidebarItem
                    inner={true}
                    label="Титульная страница"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/main-page/reviews"
                    isActive={router.pathname.includes("/admin/settings/main-page")}
                />
                <SidebarItem
                    inner={true}
                    label="Пакеты базы знаний"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/article-packages"
                    isActive={router.pathname.includes("/admin/settings/article-packages")}
                />
            </SidebarItemWithChildren>
        </Box>
    );
}
