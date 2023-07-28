import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { InfoPanel, UserSettings } from "@widgets/admin/users";
import { useDetailsUser } from "@entities/user";
import { TRouterQueries } from "@shared/types";
import { Roles } from "@app/routes";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";

const UserDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data, isLoading, isError } = useDetailsUser(id);

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
            {Roles.teacher === data.roles[0].id && (
                <Tabs tabs={tabsList} value={tabsList[0].value} onTabChange={handleChangeTab} mt={32} maw={1162} />
            )}
            <UserSettings id={id} mt={32} />
        </Box>
    );
};

export default UserDetailsPage;
