import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Briefcase, Folder, Layout, Settings, User, Users, Layers, BookOpen, Home } from "react-feather";
import { IconClipboardText, IconMessageDots, IconReceipt } from "@tabler/icons-react";
import { useClickOutside } from "@mantine/hooks";
import { Roles } from "@app/routes";
import CloseBookIcon from "public/icons/closeBook.svg";
import { useMedia } from "@shared/utils";
import { SidebarItem, SidebarItemWithChildren } from "./ui";
import useStyles from "./Sidebar.styles";
import { SidebarAdminContext } from "./utils";

export default function Sidebar() {
    const router = useRouter();
    const [isMinimizedModeSidebar, setIsMinimizedModeSidebar] = useState(false);
    const [activeSidebarItemsWithChildren, setActiveSidebarItemsWithChildren] = useState<string[]>([]);

    const { classes } = useStyles({ isMinimizedModeSidebar });

    const isTablet = useMedia("lg");

    const sidebarRef = useClickOutside(() => isTablet && setIsMinimizedModeSidebar(true));

    useEffect(() => {
        setIsMinimizedModeSidebar(isTablet);
        setActiveSidebarItemsWithChildren([]);
    }, [isTablet]);

    return (
        <SidebarAdminContext.Provider
            value={{
                isMinimizedModeSidebar,
                setIsMinimizedModeSidebar,
                activeSidebarItemsWithChildren,
                setActiveSidebarItemsWithChildren,
            }}>
            <Box className={classes.root} ref={sidebarRef}>
                <Box className={classes.inner}>
                    <SidebarItem label="Главная" isActive={router.pathname === "/admin"} icon={<Home />} href="/admin" />
                    <SidebarItem
                        label="Домашние задания"
                        isActive={router.pathname.includes("/admin/homeworks")}
                        icon={<CloseBookIcon />}
                        href="/admin/homeworks"
                    />
                    <SidebarItem
                        roles={[Roles.administrator, Roles.manager]}
                        label="Пользователи"
                        isActive={router.pathname.includes("/admin/users")}
                        icon={<User />}
                        href="/admin/users"
                    />
                    <SidebarItem
                        label="Ученики"
                        isActive={router.pathname.includes("/admin/students")}
                        icon={<Users />}
                        href="/admin/students"
                    />
                    <SidebarItem
                        label="Группы"
                        isActive={router.pathname.includes("/admin/groups")}
                        icon={<Folder />}
                        href="/admin/groups"
                    />
                    <SidebarItem
                        label="База знаний"
                        isActive={router.pathname.includes("/admin/articles")}
                        icon={<Briefcase />}
                        href="/admin/articles"
                    />
                    <SidebarItem
                        label="Курсы"
                        isActive={router.pathname.includes("/admin/courses")}
                        icon={<Layers />}
                        href="/admin/courses"
                    />
                    <SidebarItem
                        label="Уроки"
                        isActive={router.pathname.includes("/admin/lessons")}
                        icon={<BookOpen />}
                        href="/admin/lessons"
                    />
                    <SidebarItemWithChildren
                        roles={[Roles.administrator, Roles.manager]}
                        label="Аналитика"
                        isActive={router.pathname.includes("/admin/analytics")}
                        icon={<IconClipboardText />}
                        href="/admin/analytics">
                        <SidebarItem
                            label="Отчет по продажам"
                            href="/admin/analytics/transaction-report"
                            isActive={router.pathname.includes("/admin/analytics/transaction-report")}
                            isInner
                        />
                        <SidebarItem
                            label="Отчет по ученикам"
                            href="/admin/analytics/student-report"
                            isActive={router.pathname.includes("/admin/analytics/student-report")}
                            isInner
                        />
                    </SidebarItemWithChildren>
                    <SidebarItem
                        roles={[Roles.administrator, Roles.manager]}
                        label="Транзакции"
                        isActive={router.pathname.includes("/admin/transactions")}
                        icon={<IconReceipt />}
                        href="/admin/transactions"
                    />
                    <SidebarItem
                        roles={[Roles.administrator, Roles.manager]}
                        label="Сообщения"
                        isActive={router.pathname.includes("/admin/messages")}
                        icon={<IconMessageDots />}
                        href="/admin/messages"
                    />

                    <SidebarItemWithChildren
                        roles={[Roles.administrator, Roles.manager]}
                        label="Страницы"
                        isActive={router.pathname.includes("/admin/static-pages")}
                        icon={<Layout />}
                        href="/admin/static-pages">
                        <SidebarItem
                            label="О проекте"
                            href="/admin/static-pages/about"
                            isActive={router.pathname.includes("/admin/static-pages/about")}
                            isInner
                        />
                        <SidebarItem
                            label="Публичная оферта"
                            href="/admin/static-pages/user-agreement"
                            isActive={router.pathname.includes("/admin/static-pages/user-agreement")}
                            isInner
                        />
                        <SidebarItem
                            label="Контакты"
                            href="/admin/static-pages/contacts"
                            isActive={router.pathname.includes("/admin/static-pages/contacts")}
                            isInner
                        />
                        <SidebarItem
                            label="Вопрос-ответ"
                            href="/admin/static-pages/faq"
                            isActive={router.pathname.includes("/admin/static-pages/faq")}
                            isInner
                        />
                    </SidebarItemWithChildren>
                    <SidebarItemWithChildren
                        roles={[Roles.administrator]}
                        label="Настройки"
                        isActive={router.pathname.includes("/admin/settings")}
                        icon={<Settings />}
                        href="/admin/settings">
                        <SidebarItem
                            label="Теги"
                            href="/admin/settings/tags"
                            isActive={router.pathname.includes("/admin/settings/tags")}
                            isInner
                        />
                        <SidebarItem
                            label="Категории курсов"
                            href="/admin/settings/categories"
                            isActive={router.pathname.includes("/admin/settings/categories")}
                            isInner
                        />
                        <SidebarItem
                            label="Авторы курсов"
                            href="/admin/settings/authors"
                            isActive={router.pathname.includes("/admin/settings/authors")}
                            isInner
                        />
                        <SidebarItem
                            label="Справочник материалов"
                            href="/admin/settings/materials"
                            isActive={router.pathname.includes("/admin/settings/materials")}
                            isInner
                        />
                        <SidebarItem
                            label="Подборки курсов"
                            href="/admin/settings/course-collections"
                            isActive={router.pathname.includes("/admin/settings/course-collections")}
                            isInner
                        />
                        <SidebarItem
                            label="Отзывы"
                            href="/admin/settings/course-reviews"
                            isActive={router.pathname.includes("/admin/settings/course-reviews")}
                            isInner
                        />
                        <SidebarItem
                            label="Титульная страница"
                            href="/admin/settings/main-page/reviews"
                            isActive={router.pathname.includes("/admin/settings/main-page")}
                            isInner
                        />
                        <SidebarItem
                            label="Пакеты курсов"
                            href="/admin/settings/course-packages"
                            isActive={router.pathname.includes("/admin/settings/course-packages")}
                            isInner
                        />
                        <SidebarItem
                            label="Пакеты базы знаний"
                            href="/admin/settings/article-packages"
                            isActive={router.pathname.includes("/admin/settings/article-packages")}
                            isInner
                        />
                    </SidebarItemWithChildren>
                </Box>
            </Box>
        </SidebarAdminContext.Provider>
    );
}
