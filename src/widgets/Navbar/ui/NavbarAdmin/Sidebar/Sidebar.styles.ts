import { createStyles } from "@mantine/core";

interface CreateStylesParams {
    isMinimizedModeSidebar: boolean;
}

export default createStyles((theme, { isMinimizedModeSidebar }: CreateStylesParams) => ({
    root: {
        [theme.fn.smallerThan("lg")]: {
            position: "absolute",
            top: 0,
            bottom: 0,
            paddingBlock: 32,
            height: "100%",
            width: isMinimizedModeSidebar ? 72 : 280,
            backgroundColor: theme.colors.light[0],
        },
    },
    inner: {
        position: isMinimizedModeSidebar ? "static" : "relative",
        height: "100%",
        paddingRight: isMinimizedModeSidebar ? 0 : 24,
        overflow: "auto",
    },
}));
