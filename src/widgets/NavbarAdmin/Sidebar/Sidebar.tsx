import React from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Book, Briefcase, Folder, Layout, Settings, User, Users, Layers, BookOpen } from "react-feather";
import { useMantineTheme } from "@mantine/core";
import { IconMessageDots } from "@tabler/icons";
import { IconReceipt } from "@tabler/icons-react";
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
            <SidebarItem
                label="Курсы"
                isActive={router.pathname.includes("/admin/courses")}
                icon={<Layers color={theme.colors.primary[9]} />}
                href="/admin/courses"
            />
            <SidebarItem
                label="Уроки"
                isActive={router.pathname.includes("/admin/lessons")}
                icon={<BookOpen color={theme.colors.primary[9]} />}
                href="/admin/lessons"
            />

            <SidebarItem
                label="Транзакции"
                isActive={router.pathname.includes("/admin/transactions")}
                icon={<IconReceipt color={theme.colors.primary[9]} />}
                href="/admin/transactions"
            />

            <SidebarItem
                label="Сообщения"
                isActive={router.pathname.includes("/admin/messages")}
                icon={<IconMessageDots color={theme.colors.primary[9]} />}
                href="/admin/messages"
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
                    label="Отзывы"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/course-reviews"
                    isActive={router.pathname.includes("/admin/settings/course-reviews")}
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
                    label="Пакеты курсов"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/course-packages"
                    isActive={router.pathname.includes("/admin/settings/course-packages")}
                />
                <SidebarItem
                    inner={true}
                    label="Пакеты базы знаний"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/settings/article-packages"
                    isActive={router.pathname.includes("/admin/settings/article-packages")}
                />
            </SidebarItemWithChildren>
            <SidebarItemWithChildren
                roles={["ADMIN"]}
                label="Страницы"
                isActive={router.pathname.includes("/admin/static-pages")}
                icon={<Layout color={theme.colors.primary[9]} />}>
                <SidebarItem
                    inner={true}
                    label="О проекте"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/static-pages/about"
                    isActive={router.pathname.includes("/admin/static-pages/about")}
                />
                <SidebarItem
                    inner={true}
                    label="Публичная оферта"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/static-pages/user-agreement"
                    isActive={router.pathname.includes("/admin/static-pages/user-agreement")}
                />
                <SidebarItem
                    inner={true}
                    label="Контакты"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/static-pages/contacts"
                    isActive={router.pathname.includes("/admin/static-pages/contacts")}
                />

                <SidebarItem
                    inner={true}
                    label="Вопрос-ответ"
                    icon={<User color={theme.colors.primary[9]} />}
                    href="/admin/static-pages/faq"
                    isActive={router.pathname.includes("/admin/static-pages/faq")}
                />
            </SidebarItemWithChildren>
        </Box>
    );
}
