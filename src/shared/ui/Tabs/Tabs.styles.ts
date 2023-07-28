import { createStyles } from "@mantine/core";

interface IUseTabsStylesProps {
    count: number;
}

export const useTabsStyles = createStyles((theme, { count }: IUseTabsStylesProps) => ({
    tabsList: {
        borderBottom: "none",
        backgroundColor: theme.colors.grayLight[0],
        gap: 4,
        padding: 4,
        width: "100%",
        borderRadius: 8,
        display: "grid",
        gridTemplateColumns: `repeat(${count}, 1fr)`,

        overflowX: "auto",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
    tab: {
        width: "100%",
        padding: 0,
        color: theme.colors.gray45[0],
        borderRadius: 8,
        ":hover, &[data-active]": {
            border: "none",
            backgroundColor: theme.colors.white[0],

            p: {
                color: theme.colors.dark[0],
            },
        },
    },
    tabLabel: {
        display: "flex",
        alignItems: "center",
        padding: "12px 27px",
        fontWeight: 600,
        fontSize: 16,
        lineHeight: "24px",
    },
}));
