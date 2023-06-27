import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { InfoPanel, GroupSettings } from "@widgets/admin/groups";
import { TRouterQueries } from "@shared/types";
import { GroupScheduleList, StudentList } from "@features/groups";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const GroupDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: groupData, isLoading, isError } = useAdminGroup({ id });

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id, tab: value } });
    };

    const renderContent = () => {
        switch (tab) {
            case "composition":
                return <StudentList groupId={id} mt={32} />;
            case "schedule":
                return <GroupScheduleList groupId={id} mt={32} />;
            default:
                return <GroupSettings id={id} mt={32} />;
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
            <InfoPanel id={id} />
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default GroupDetailsPage;
