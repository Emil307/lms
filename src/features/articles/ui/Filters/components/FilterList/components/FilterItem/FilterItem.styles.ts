import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    selected?: boolean;
}

export default createStyles((theme, { selected }: CreateStylesParams) => ({
    tooltip: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width: 48,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralWhite[0],
        boxShadow: "0px 16px 32px 0px rgba(2, 6, 46, 0.08)",
        pointerEvents: "auto",

        ":hover": {
            boxShadow: "0px 0px 16px 0px rgba(0, 18, 110, 0.04), 0px 1px 2px 0px rgba(0, 18, 110, 0.04)",
        },
    },
    filterIcon: {
        color: theme.colors.dark[0],
        "&:hover": {
            color: theme.colors.secondary[0],
        },
    },
    tooltipInner: {
        width: selected ? "calc(100% - 48px)" : "100%",
        transition: "width 0.1s",
    },
}));
