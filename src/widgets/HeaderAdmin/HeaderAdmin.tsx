import React from "react";
import { Avatar, Flex, Header as MHeader, Stack, Text } from "@mantine/core";
import { Button } from "@shared/ui";
import { useHeaderAdminStyles } from "./HeaderAdminStyles";

const HeaderAdmin = () => {
    const { classes } = useHeaderAdminStyles();
    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex justify="space-between">
                <Button variant="text">Notification</Button>

                <Flex align="center" gap={32}>
                    <Flex align="center" gap={16}>
                        <Avatar w={50} h={50} />
                        <Stack spacing={0}>
                            <Text>Name</Text> <Text>Name</Text>
                        </Stack>
                    </Flex>
                    <Flex gap={8}>
                        <Button variant="text">1</Button>
                        <Button variant="text">2</Button>
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderAdmin;
