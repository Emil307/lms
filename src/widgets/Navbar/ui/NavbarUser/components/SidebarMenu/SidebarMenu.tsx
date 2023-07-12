import React, { useMemo } from "react";
import { Flex } from "@mantine/core";
import { SidebarItem } from "./components";
import { SidebarItemData } from "./types";

export interface SidebarMenuProps {
    items: SidebarItemData[];
}

const SidebarMenu = ({ items }: SidebarMenuProps) => {
    const renderItems = useMemo(() => items.map((sidebarItem, index) => <SidebarItem key={index} data={sidebarItem} />), [items]);

    return (
        <Flex direction="column" gap={16}>
            {renderItems}
        </Flex>
    );
};

export default SidebarMenu;
