import React from "react";
import { Box, Flex, Header as MHeader } from "@mantine/core";
import { useHeaderStyles } from "./HeaderStyles";
import { Notification } from "@components/Notification";

const Header = () => {
    const { classes } = useHeaderStyles();
    return (
        <MHeader classNames={classes} height="auto">
            <Flex justify="space-between">
                <Notification />

                <Box>Avatar Setting Exit</Box>
            </Flex>
        </MHeader>
    );
};

export default Header;
