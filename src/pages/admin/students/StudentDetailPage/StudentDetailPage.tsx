import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { useDetailUser } from "@entities/user";
import { InfoPanel, StudentSettings } from "@widgets/admin/students";
import { TRouterQueries } from "@shared/types";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const StudentDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: userData, isLoading, isError } = useDetailUser(id);

    const userName = `${userData?.firstName} ${userData?.lastName}`;

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "courses":
                router.push({ pathname: `/admin/groups/[id]`, query: { id } });
                break;
            case "groups":
                router.push({ pathname: `/admin/groups/[id]`, query: { id } });
                break;
            case "knowledge-packs":
                router.push({ pathname: `/admin/groups/[id]`, query: { id } });
                break;
            default:
                router.push({ pathname: `/admin/students/[id]`, query: { id } });
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
            <BreadCrumbs items={getBreadCrumbsItems({ userName, id })} />
            <InfoPanel id={id} />
            <Tabs value={tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            <StudentSettings id={id} />
        </Box>
    );
};

export default StudentDetailPage;
