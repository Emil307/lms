import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminGroupList } from "@features/groups";
import useStyles from "./GroupsPage.styles";

const GroupsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const handleOpenCreateGroupForm = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Группы</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={handleOpenCreateGroupForm}>
                    Создать группу
                </Button>
            </Flex>
            <AdminGroupList />
        </Box>
    );
};

export default GroupsPage;
