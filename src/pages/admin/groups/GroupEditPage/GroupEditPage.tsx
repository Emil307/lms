import { Box, Loader } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { EditGroupForm } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const GroupEditPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: groupData, isLoading } = useAdminGroup(id);

    const handleCancel = () => {
        router.push("/admin/groups");
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ groupName: groupData?.name, id })} mb={8} />
            <EditGroupForm data={groupData} onClose={handleCancel} />
        </Box>
    );
};

export default GroupEditPage;
