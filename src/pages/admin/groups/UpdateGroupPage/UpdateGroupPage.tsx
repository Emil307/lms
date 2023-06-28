import { Box, Title, Text, Flex, Badge } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { UpdateAdminGroupForm } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./UpdateGroupPage.styles";

const UpdateGroupPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: groupData, isLoading, isError } = useAdminGroup({ id });
    const { classes } = useStyles({ statusType: groupData?.status.type });

    const handleCancel = () => {
        router.push("/admin/groups");
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

            <Flex gap={16} align="center" mb={24}>
                <Title order={1} color="dark">
                    {groupData.name}
                </Title>
                <Badge variant="outline" className={classes.status}>
                    {groupData.status.name}
                </Badge>
            </Flex>
            <UpdateAdminGroupForm data={groupData} onClose={handleCancel} />
        </Box>
    );
};

export default UpdateGroupPage;
