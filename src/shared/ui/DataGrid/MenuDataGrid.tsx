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
    },
    action: {
        display: "flex",
        marginLeft: "auto",
        borderRadius: 60,
        ":hover": {
            backgroundColor: theme.colors.secondary8[8],
        },
    },
}));

const MenuDataGrid = ({ children, ...props }: MenuProps) => {
    const { classes } = useMenuStyles();

    return (
        <Menu {...props}>
            <Menu.Target>
                <ActionIcon className={classes.action}>
                    <MoreVertical width={24} height={24} color={defaultTheme.colors?.primary?.[0]} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown className={classes.wrapper}>{children}</Menu.Dropdown>
        </Menu>
    );
};

export default MenuDataGrid;
