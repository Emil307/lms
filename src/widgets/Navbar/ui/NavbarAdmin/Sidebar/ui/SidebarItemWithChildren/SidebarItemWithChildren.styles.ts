import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isActive: boolean;
    isMinimizedModeSidebar: boolean;
}

export default createStyles((theme, { isActive, isMinimizedModeSidebar }: CreateStylesParams) => ({
    item: {
        border: "none",

        borderRadius: 16,
        backgroundColor: "inherit",

        "&[data-active]": {
            backgroundColor: "inherit",
            boxShadow: "none",
        },
        "&:not(:first-of-type)": {
            backgroundColor: "inherit",
        },
    },
    accordionItem: {
        padding: 0,
    },
    control: {
        paddingInline: "0 !important",
        paddingBottom: "0 !important",
        backgroundColor: "initial",
    },
    content: {
        padding: "0 !important",
        marginTop: 2,
    },
    chevron: {
        marginBlock: "auto",
        display: isMinimizedModeSidebar ? "none" : "flex",
        svg: {
            width: 16,
            height: 16,
            strokeWidth: 3,
            color: isActive ? theme.colors.dark[0] : theme.colors.neutralMain50[0],
        },
    },
}));
