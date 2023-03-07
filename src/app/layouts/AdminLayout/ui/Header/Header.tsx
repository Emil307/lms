import React from "react";
import { Box, Flex, Header as MHeader } from "@mantine/core";
import { useHeaderStyles } from "./HeaderStyles";

const Header = () => {
    const { classes } = useHeaderStyles();
    return (
        <MHeader classNames={classes} height="auto">
            <Flex justify="space-between">
                <Box>Всякие сообщения</Box>
                <Box>Avatar Setting Exit</Box>
            </Flex>
        </MHeader>
    );
};

export default Header;
