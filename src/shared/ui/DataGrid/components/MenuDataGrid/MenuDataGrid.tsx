import { ActionIcon, Menu, MenuProps as MMenuProps } from "@mantine/core";
import React, { ReactNode } from "react";
import { MoreVertical } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useMenuStyles } from "./MenuDataGridStyles";

export type TMenuDataGridProps = MMenuProps & {
    children?: ReactNode;
};

const MenuDataGrid = ({ children, ...props }: TMenuDataGridProps) => {
    const { classes } = useMenuStyles();

    return (
        <Menu {...props} withinPortal position="bottom-end">
            <Menu.Target>
                <ActionIcon className={classes.action}>
                    <MoreVertical width={24} height={24} color={defaultTheme.colors?.dark?.[0]} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown className={classes.wrapper}>{children}</Menu.Dropdown>
        </Menu>
    );
};

export default MenuDataGrid;
