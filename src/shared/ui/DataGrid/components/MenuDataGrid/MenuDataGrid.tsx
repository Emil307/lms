import { ActionIcon, Menu, MenuProps as MMenuProps } from "@mantine/core";
import React, { ReactNode } from "react";
import { MoreVertical } from "react-feather";
import { useMenuStyles } from "./MenuDataGridStyles";

export type TMenuDataGridProps = MMenuProps & {
    children?: ReactNode;
};

const MenuDataGrid = ({ children, ...props }: TMenuDataGridProps) => {
    const { classes } = useMenuStyles();

    return (
        <Menu classNames={{ dropdown: classes.dropdown }} width={240} withinPortal position="bottom-end" {...props}>
            <Menu.Target>
                <ActionIcon className={classes.action} color="dark">
                    <MoreVertical width={24} height={24} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>{children}</Menu.Dropdown>
        </Menu>
    );
};

export default MenuDataGrid;
