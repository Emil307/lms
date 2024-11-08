import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminGroupList } from "@features/groups";
import { useUserRole } from "@entities/auth";
import { useMedia } from "@shared/utils";
import { Roles } from "@shared/types";
import useStyles from "./GroupsPage.styles";

const GroupsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const isTablet = useMedia("md");

    const handleOpenCreateGroupForm = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Группы</Heading>
                {userRole && userRole.name !== Roles.teacher && (
                    <Button
                        variant="secondary"
                        size={isTablet ? "medium" : "large"}
                        leftIcon={<PlusCircle />}
                        onClick={handleOpenCreateGroupForm}>
                        Создать группу
                    </Button>
                )}
            </Flex>
            <AdminGroupList />
        </Box>
    );
};

export default GroupsPage;
