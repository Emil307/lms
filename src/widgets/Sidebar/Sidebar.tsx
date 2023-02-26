import React from "react";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import Item from "./Item";
import { useSidebarItems } from "./constants";
// type Props = {}

export default function Sidebar() {
    const router = useRouter();
    const items = useSidebarItems();
    return (
        <Box>
            {items.map((item) => (
                <Item key={item.href} isActive={router.pathname.includes(item.href)} {...item} />
            ))}
        </Box>
    );
}
