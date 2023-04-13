import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, TBreadCrumbItem } from "@shared/ui";
import { InfoPanel, SettingUser } from "@widgets/admin/users";
import { useDetailUser } from "@entities/user";

const UserDetail = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data, isLoading, isError } = useDetailUser(id);

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Пользователи", href: { pathname: "/admin/users" } },
        { title: `${data?.firstName} ${data?.patronymic} ${data?.lastName}`, href: { pathname: "/admin/users/[id]", query: { id: id } } },
    ];

    const tabsList = [
        { id: 1, label: "Настройки", value: "1" },
        { id: 2, label: "Курсы преподавателя", value: "2" },
        { id: 3, label: "Группы преподавателя", value: "3" },
    ];

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} />
            <InfoPanel id={id} />
            {/* TODO - переключение виджетов по табам, когда будет апи и сверстано все остальное */}
            <Tabs tabs={tabsList} mt={32} />
            <SettingUser id={id} />
        </Box>
    );
};

export default UserDetail;
