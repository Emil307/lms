import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { InfoPanel, SettingUser } from "@widgets/admin/users";
import { useDetailUser } from "@entities/user";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";

const UserDetail = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data, isLoading, isError } = useDetailUser(id);

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
            {/* TODO - переключение виджетов по табам, когда будет апи и сверстано все остальное */}
            <Tabs tabs={tabsList} mt={32} />
            <SettingUser id={id} />
        </Box>
    );
};

export default UserDetail;
