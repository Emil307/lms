import React, { memo } from "react";
import { Indicator, Tabs as MTabs, TabsProps as MTabsProps } from "@mantine/core";
import { TabItem } from "./types";
import { useTabsStyles } from "./Tabs.styles";
import { Paragraph } from "../Typography";

export interface TabsProps extends Omit<MTabsProps, "children"> {
    tabs: TabItem[];
}

const Tabs = ({ tabs, ...props }: TabsProps) => {
    const { classes } = useTabsStyles({ count: tabs.length });
    const tabsList = tabs.map((item) => {
        const { id, label, value, count, withIndicator } = item;
        return (
            <Indicator offset={12} key={id} disabled={!withIndicator} size={8} color="done">
                <MTabs.Tab value={value}>
                    {label}
                    {typeof count === "number" && (
                        <Paragraph variant="small-m" color="neutralMain50">
                            {count}
                        </Paragraph>
                    )}
                </MTabs.Tab>
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
