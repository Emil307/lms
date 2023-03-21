import { createStyles, Flex, Menu, MenuItemProps } from "@mantine/core";
import React, { ReactNode } from "react";

export interface MenuProps extends MenuItemProps {
    children?: ReactNode;
    onClick?: () => void;
}

const useMenuItemStyles = createStyles((theme) => ({
    wrapper: {
        ":hover": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    inner: {
        padding: 12,
        cursor: "pointer",
        borderRadius: 8,
        fontSize: 14,
        lineHeight: "16px",
    },
}));

const MenuItemDataGrid = ({ children, onClick = () => undefined, ...props }: MenuProps) => {
    const { classes } = useMenuItemStyles();
    return (
        <Menu.Item {...props} onClick={onClick}>
            <Flex gap={8} align="center" className={classes.inner}>
                {children}
            </Flex>
        </Menu.Item>
    );
};

export default MenuItemDataGrid;
