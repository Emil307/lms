import { Flex, Menu, MenuItemProps } from "@mantine/core";
import React, { ReactNode } from "react";
import { useMenuItemStyles } from "./MenuItemDataGridStyles";

export type TMenuItemDataGridProps = MenuItemProps & {
    children?: ReactNode;
    onClick?: () => void;
};

const MenuItemDataGrid = ({ children, onClick = () => undefined, ...props }: TMenuItemDataGridProps) => {
    const { classes, cx } = useMenuItemStyles();
    return (
        <Menu.Item {...props} className={cx(classes.menuItem, props.className)} onClick={onClick}>
            <Flex gap={8} align="center" className={classes.inner}>
                {children}
            </Flex>
        </Menu.Item>
    );
};

export default MenuItemDataGrid;
