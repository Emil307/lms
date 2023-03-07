// import { Box, Flex } from "@mantine/core";
import { Button } from "@shared/ui";
import React from "react";
import { Bell } from "react-feather";
// import { useNotificationStyles } from "./NotificationStyle";

const Notification = () => {
    // const { classes } = useNotificationStyles();
    return (
        <Button variant="white">
            <Bell />12
        </Button>
    );
};

export default Notification;
