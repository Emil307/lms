import { createStyles, Stack } from "@mantine/core";
import React, { ReactNode } from "react";

export interface MenuProps {
    children?: ReactNode;
}

const useMenuStyles = createStyles(() => ({
    wrapper: {
        padding: 8,
    },
}));

export const Menu = ({ children }: MenuProps) => {
    const { classes } = useMenuStyles();
    return (
        <Stack spacing={2} className={classes.wrapper}>
            {children}
        </Stack>
    );
};
