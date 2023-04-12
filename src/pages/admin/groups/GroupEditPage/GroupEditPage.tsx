import { Box, Loader } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { EditGroupForm } from "@features/groups";

const GroupEditPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const { data: groupData, isLoading } = useAdminGroup(id);

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Группы", href: { pathname: "/admin/groups" } },
        { title: groupData?.data.name || "", href: { pathname: "/admin/groups/[id]/edit", query: { id } } },
    ];

    const handleCancel = () => {
        router.push("/admin/groups");
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <EditGroupForm data={groupData?.data} onClose={handleCancel} />
        </Box>
    );
};

export default GroupEditPage;
