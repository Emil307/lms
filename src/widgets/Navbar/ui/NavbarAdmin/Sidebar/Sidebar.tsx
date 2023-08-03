import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { Book, Briefcase, Folder, Layout, Settings, User, Users, Layers, BookOpen } from "react-feather";
import { IconMessageDots, IconReceipt } from "@tabler/icons-react";
import { useClickOutside, useMediaQuery } from "@mantine/hooks";
import { Roles } from "@app/routes";
import SidebarItem from "./ui/SidebarItem/SidebarItem";
import SidebarItemWithChildren from "./ui/SidebarItemWithChildren/SidebarItemWithChildren";
import useStyles from "./Sidebar.styles";
import CloseBookIcon from "public/icons/closeBook.svg";
import { MinimizedModeSidebarContext } from "./utils";

export default function Sidebar() {
    const router = useRouter();
    const [isMinimizedModeSidebar, setIsMinimizedModeSidebar] = useState(false);
    const [activeSidebarItemsWithChildren, setActiveSidebarItemsWithChildren] = useState<string[]>([]);

    const { classes } = useStyles({ isMinimizedModeSidebar });

    const isTablet = useMediaQuery("(max-width: 1440px)");

    const sidebarRef = useClickOutside(() => isTablet && setIsMinimizedModeSidebar(true));

    useEffect(() => {
        setIsMinimizedModeSidebar(isTablet);
        setActiveSidebarItemsWithChildren([]);
    }, [isTablet]);

    const handleChangeActiveSidebarItemWithChildren = (value: string) => {
        if (!isTablet) {
            if (activeSidebarItemsWithChildren.includes(value)) {
                return setActiveSidebarItemsWithChildren(activeSidebarItemsWithChildren.filter((item) => item !== value));
            }
            return setActiveSidebarItemsWithChildren([...activeSidebarItemsWithChildren, value]);
        }
        if (value === activeSidebarItemsWithChildren[0]) {
            setActiveSidebarItemsWithChildren([]);
            return setIsMinimizedModeSidebar(true);
        }

        setIsMinimizedModeSidebar(false);
        setActiveSidebarItemsWithChildren([value]);
    };

    return (
        <MinimizedModeSidebarContext.Provider value={{ isMinimizedModeSidebar, setIsMinimizedModeSidebar }}>
            <Box className={classes.root} ref={sidebarRef}>
                <Box className={classes.inner}>
                    {/*TODO: Убрать при релизе*/}
                    <SidebarItem label="UI" isActive={router.pathname.includes("/ui")} icon={<Book />} href="/ui" />
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
                        roles={[Roles.administrator, Roles.manager]}
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
                        roles={[Roles.administrator, Roles.manager]}
                        label="Уроки"
                        isActive={router.pathname.includes("/admin/lessons")}
                        icon={<BookOpen />}
                        href="/admin/lessons"
                    />
                    {/* //TODO: Аналитика */}
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
                        isOpen={activeSidebarItemsWithChildren.includes("/admin/static-pages")}
                        itemId="/admin/static-pages"
                        setIsOpenSidebarItem={handleChangeActiveSidebarItemWithChildren}>
                        <SidebarItem
                            inner={true}
                            label="О проекте"
                            href="/admin/static-pages/about"
                            isActive={router.pathname.includes("/admin/static-pages/about")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Публичная оферта"
                            href="/admin/static-pages/user-agreement"
                            isActive={router.pathname.includes("/admin/static-pages/user-agreement")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Контакты"
                            href="/admin/static-pages/contacts"
                            isActive={router.pathname.includes("/admin/static-pages/contacts")}
                        />

                        <SidebarItem
                            inner={true}
                            label="Вопрос-ответ"
                            href="/admin/static-pages/faq"
                            isActive={router.pathname.includes("/admin/static-pages/faq")}
                        />
                    </SidebarItemWithChildren>
                    <SidebarItemWithChildren
                        roles={[Roles.administrator]}
                        label="Настройки"
                        isActive={router.pathname.includes("/admin/settings")}
                        icon={<Settings />}
                        isOpen={activeSidebarItemsWithChildren.includes("/admin/settings")}
                        itemId="/admin/settings"
                        setIsOpenSidebarItem={handleChangeActiveSidebarItemWithChildren}>
                        <SidebarItem
                            inner={true}
                            label="Теги"
                            href="/admin/settings/tags"
                            isActive={router.pathname.includes("/admin/settings/tags")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Категории курсов"
                            href="/admin/settings/categories"
                            isActive={router.pathname.includes("/admin/settings/categories")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Авторы курсов"
                            href="/admin/settings/authors"
                            isActive={router.pathname.includes("/admin/settings/authors")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Справочник материалов"
                            href="/admin/settings/materials"
                            isActive={router.pathname.includes("/admin/settings/materials")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Подборки курсов"
                            href="/admin/settings/course-collections"
                            isActive={router.pathname.includes("/admin/settings/course-collections")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Отзывы"
                            href="/admin/settings/course-reviews"
                            isActive={router.pathname.includes("/admin/settings/course-reviews")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Титульная страница"
                            href="/admin/settings/main-page/reviews"
                            isActive={router.pathname.includes("/admin/settings/main-page")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Пакеты курсов"
                            href="/admin/settings/course-packages"
                            isActive={router.pathname.includes("/admin/settings/course-packages")}
                        />
                        <SidebarItem
                            inner={true}
                            label="Пакеты базы знаний"
                            href="/admin/settings/article-packages"
                            isActive={router.pathname.includes("/admin/settings/article-packages")}
                        />
                    </SidebarItemWithChildren>
                </Box>
            </Box>
        </MinimizedModeSidebarContext.Provider>
    );
}
