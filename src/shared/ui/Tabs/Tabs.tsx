import React, { memo } from "react";
import { Indicator, Tabs as MTabs, TabsProps as MTabsProps } from "@mantine/core";
import { useTabsStyles } from "./Tabs.styles";

interface TabItem {
    id: number;
    label: string;
    value: string;
    withIndicator?: boolean;
}

export interface TabsProps extends Omit<MTabsProps, "children"> {
    tabs: TabItem[];
}

const Tabs = ({ tabs, ...props }: TabsProps) => {
    const { classes } = useTabsStyles({ count: tabs.length });
    const tabsList = tabs.map((item) => {
        const { id, label, value, withIndicator } = item;
        return (
            <Indicator offset={12} key={id} disabled={!withIndicator} size={8} color="done">
                <MTabs.Tab value={value}>{label}</MTabs.Tab>
            </Indicator>
        );
    });
    return (
        <MTabs defaultValue="gallery" classNames={classes} {...props}>
            <MTabs.List>{tabsList}</MTabs.List>
        </MTabs>
    );
};

export default memo(Tabs);
