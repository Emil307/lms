import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        backgroundColor: theme.colors.white[0],
        position: "sticky",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        zIndex: 200,
    },
    inner: {
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1320,
        minHeight: 96,
        marginInline: "auto",
        paddingInline: 16,
    },
    logoLink: {
        color: theme.colors.dark[0],
        textDecoration: "none",
    },
    actionIcon: {
        height: 40,
        width: 56,
        color: theme.colors.dark[0],
        borderRadius: 160,
    },
}));
