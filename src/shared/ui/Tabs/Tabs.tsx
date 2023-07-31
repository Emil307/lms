import React, { memo } from "react";
import { Indicator, Tabs as MTabs, TabsProps as MTabsProps } from "@mantine/core";
import { defaultTheme } from "@app/providers/Theme/theme";
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
            <Indicator offset={12} key={id} disabled={!withIndicator} size={8} color={defaultTheme.colors?.done?.[0]}>
                <MTabs.Tab value={value}>
                    {label}
                    <Paragraph variant="small-m" color="gray45">
                        {count}
                    </Paragraph>
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
