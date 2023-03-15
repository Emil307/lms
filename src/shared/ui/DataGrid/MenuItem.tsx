import { createStyles, Flex } from "@mantine/core";
import React, { ReactNode } from "react";

export interface MenuProps {
    children?: ReactNode;
}

const useMenuItemStyles = createStyles((theme) => ({
    wrapper: {
        padding: 12,
        cursor: "pointer",
        borderRadius: 8,
        fontSize: 14,
        lineHeight: "16px",
        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));

export const MenuItem = ({ children }: MenuProps) => {
    const { classes } = useMenuItemStyles();
    return (
        <Flex gap={8} align="center" className={classes.wrapper}>
            {children}
        </Flex>
    );
};
