import { Box, Text, Flex, Badge } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { UpdateAdminGroupResponse, useAdminGroup } from "@entities/group";
import { UpdateAdminGroupForm } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./UpdateGroupPage.styles";
import { TRequestParams } from "./types";

const UpdateGroupPage = () => {
    const router = useRouter();
    const { id, courseId } = router.query as TRouterQueries & TRequestParams;
    const { data: groupData, isLoading, isError } = useAdminGroup({ id });
    const { classes } = useStyles({ statusType: groupData?.status.type });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const handleCancelForm = () => {
        if (courseId) {
            return router.push({ pathname: "/admin/courses/[id]", query: { id: String(groupData.course.id), tab: "groups" } });
        }
        router.push("/admin/groups");
    };

    const handleSuccessForm = (group: UpdateAdminGroupResponse) => {
        if (courseId) {
            return router.push({ pathname: "/admin/courses/[id]", query: { id: String(groupData.course.id), tab: "groups" } });
        }
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(group.id) } });
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ groupName: groupData.name, id })} mb={8} />

            <Flex gap={16} align="center" mb={24}>
                <Heading>{groupData.name}</Heading>
                <Badge className={classes.status}>{groupData.status.name}</Badge>
            </Flex>
            <UpdateAdminGroupForm data={groupData} courseId={courseId} onSuccess={handleSuccessForm} onCancel={handleCancelForm} />
        </Box>
    );
};

export default UpdateGroupPage;
