import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, TBreadCrumbItem } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { GroupInfoPanel } from "@widgets/admin/groups";
import { GroupSchedule } from "@features/groups";
import { tabsList } from "./constants";

const GroupSchedulePage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: groupData, isLoading, isError } = useAdminGroup(id);

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Группы", href: { pathname: "/admin/groups" } },
        { title: groupData?.name || "", href: { pathname: "/admin/groups/[id]", query: { id: id } } },
    ];

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
            <BreadCrumbs items={breadCrumbsItems} />
            <GroupInfoPanel id={id} />
            <Tabs value={tabsList[2].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            <GroupSchedule />
        </Box>
    );
};

export default GroupSchedulePage;
