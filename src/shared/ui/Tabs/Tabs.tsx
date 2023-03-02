import React, { memo } from "react";
import { Box, Tabs as MTabs } from "@mantine/core";
import { useTabsStyles } from "./TabsStyles";

interface TabItem {
    id: number;
    label: string;
    value: string;
    isNew?: boolean;
}

export interface TabsProps extends Omit<React.ComponentProps<typeof MTabs>, "children"> {
    tabs: TabItem[];
}

const Tabs = ({ tabs, ...props }: TabsProps) => {
    const { classes } = useTabsStyles();
    const tabsList = tabs.map((item) => {
        const { id, label, value, isNew } = item;
        return (
            <MTabs.Tab key={id} value={value}>
                {label}
                {isNew && <Box className={classes.circle} />}
            </MTabs.Tab>
        );
    });
    return (
        <MTabs defaultValue="gallery" classNames={classes} {...props}>
            <MTabs.List>{tabsList}</MTabs.List>
        </MTabs>
    );
};

export default memo(Tabs);
