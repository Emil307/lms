import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { GroupInfoPanel } from "@widgets/admin/groups";
import { StudentList } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const GroupCompositionPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: groupData, isLoading, isError } = useAdminGroup(id);

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "composition":
                router.push({ pathname: `/admin/groups/[id]/composition`, query: { id } });
                break;
            case "schedule":
                router.push({ pathname: `/admin/groups/[id]/schedule`, query: { id } });
                break;
            default:
                router.push({ pathname: `/admin/groups/[id]`, query: { id } });
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
            <BreadCrumbs items={getBreadCrumbsItems({ groupName: groupData.name, id })} mb={8} />
            <GroupInfoPanel id={id} />
            <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            <StudentList />
        </Box>
    );
};

export default GroupCompositionPage;
