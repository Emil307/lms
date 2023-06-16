import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles(() => ({
    root: {
        position: "static",
        backgroundColor: "inherit",
        border: "none",
        width: 280,
        flexShrink: 0,
        paddingTop: 32,
        zIndex: 1,
    },
    sidebarWrapper: {
        position: "sticky",
        top: HEADER_HEIGHT,
        left: 0,
    },
}));
