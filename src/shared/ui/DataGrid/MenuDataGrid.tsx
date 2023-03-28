import { ActionIcon, createStyles, Menu, MenuProps as MMenuProps } from "@mantine/core";
import React, { ReactNode } from "react";
import { MoreVertical } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";

export interface MenuProps extends MMenuProps {
    children?: ReactNode;
}

const useMenuStyles = createStyles((theme) => ({
    wrapper: {
        padding: 8,
        right: "16px !important",
        left: "auto !important",
    },
    action: {
        display: "flex",
        marginLeft: "auto",
        borderRadius: 60,
        zIndex: 99,
        cursor: "pointer",
        pointerEvents: "fill",
        position: "relative",
        ":hover": {
            backgroundColor: theme.colors.secondary8[0],
        },
    },
}));

const MenuDataGrid = ({ children, ...props }: MenuProps) => {
    const { classes } = useMenuStyles();

    return (
        <Menu {...props} withinPortal>
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
