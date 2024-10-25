import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isMinimizedModeSidebar: boolean;
    maxHeight: number;
}

export default createStyles((theme, { isMinimizedModeSidebar, maxHeight }: CreateStylesParams) => ({
    root: {
        position: "static",
        backgroundColor: "inherit",
        width: 280,
        marginBlock: 24,
        paddingBlock: 8,
        border: "none",
        overflowY: "auto",
        minHeight: "calc(100% - 32px)",
        maxHeight: maxHeight - 24,
        zIndex: 1,

        [theme.fn.smallerThan("lg")]: {
            overflow: "hidden",
            width: isMinimizedModeSidebar ? 72 : 280,
            minHeight: !isMinimizedModeSidebar ? "100%" : "calc(100% - 32px)",
            maxHeight: !isMinimizedModeSidebar ? maxHeight : maxHeight - 24,
            marginBlock: 0,
            paddingBlock: 0,

            zIndex: 200,
        },

        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    inner: {
        position: "sticky",
        left: 0,

        [theme.fn.smallerThan("lg")]: {
            position: "relative",
            height: "100%",
            top: 0,
            paddingBlock: 32,
            width: 280,
            backgroundColor: theme.colors.neutralGray100[0],
            overflow: "hidden",
        },
    },
}));
