import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { InfoPanel, GroupSettings } from "@widgets/admin/groups";
import { TRouterQueries } from "@shared/types";
import { GroupScheduleList, StudentList } from "@features/groups";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { useUserRole } from "@entities/auth";

const GroupDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: groupData, isLoading, isError } = useAdminGroup({ id });

    const userRole = useUserRole();

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/groups/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!userRole) {
        return null;
    }

    const renderContent = () => {
        switch (currentTab) {
            case "composition":
                return <StudentList groupId={id} courseId={groupData.course.id} />;
            case "schedule":
                return <GroupScheduleList groupId={id} />;
            default:
                return <GroupSettings id={id} />;
        }
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: groupData.name, id })} mb={8} />
            <InfoPanel id={id} mb={32} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} mb={32} />
            {renderContent()}
        </Box>
    );
};

export default GroupDetailsPage;
