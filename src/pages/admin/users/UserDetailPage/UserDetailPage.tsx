import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { InfoPanel, SettingUser } from "@widgets/admin/users";
import { useDetailUser } from "@entities/user";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";

const UserDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data, isLoading, isError } = useDetailUser(id);

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            // TODO: - переключение виджетов по табам, когда будет апи и сверстано все остальное
            default:
                router.push({ pathname: "/admin/users/[id]", query: { id } });
                break;
        }
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ data })} />
            <InfoPanel id={id} />
            {/* TODO: - переключение виджетов по табам, когда будет апи и сверстано все остальное */}
            <Tabs tabs={tabsList} value={tabsList[0].value} onTabChange={handleChangeTab} mt={32} />
            <SettingUser id={id} />
        </Box>
    );
};

export default UserDetailPage;
