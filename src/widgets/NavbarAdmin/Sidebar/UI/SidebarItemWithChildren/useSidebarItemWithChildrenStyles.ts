import { createStyles } from "@mantine/core";

interface TUseSidebarItemWithChildrenStylesProps {
    isActive: boolean;
}

export const useSidebarItemWithChildrenStyles = createStyles((theme, { isActive }: TUseSidebarItemWithChildrenStylesProps) => ({
    item: {
        border: "none",
    },
    content: {
        padding: 0,
    },
    chevron: {
        svg: {
            width: 16,
            height: 16,
            strokeWidth: 3,
            color: isActive ? theme.colors.dark[0] : theme.colors.gray45[0],
        },
    },
}));
