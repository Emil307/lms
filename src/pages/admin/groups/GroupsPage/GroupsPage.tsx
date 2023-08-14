import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminGroupList } from "@features/groups";

const GroupsPage = () => {
    const router = useRouter();

    const handleOpenCreateGroupForm = () => router.push("/admin/groups/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>Группы</Heading>
                <Button onClick={handleOpenCreateGroupForm} variant="secondary" size="large" leftIcon={<PlusCircle />}>
                    Создать группу
                </Button>
            </Flex>
            <AdminGroupList mt={24} />
        </Box>
    );
};

export default GroupsPage;
