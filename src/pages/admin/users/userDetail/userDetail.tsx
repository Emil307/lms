import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Tabs, TBreadCrumbItem } from "@shared/ui";
import { InfoPanel, SettingUser } from "@widgets/admin";

const UserDetail = () => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Пользователи", href: { pathname: "/admin/users" } },
        { title: "Настройки профиля", href: { pathname: "/admin/users/[id]", query: { id: "1" } } },
    ];

    const tabsList = [
        { id: 1, label: "Настройки", value: "1" },
        { id: 2, label: "Курсы преподавателя", value: "2" },
        { id: 3, label: "Группы преподавателя", value: "3" },
    ];

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} />
            <InfoPanel />
            {/* TODO - переключение виджетов по табам, когда будет апи и сверстано все остальное */}
            <Tabs tabs={tabsList} mt={32} />
            <SettingUser />
        </Box>
    );
};

export default UserDetail;
