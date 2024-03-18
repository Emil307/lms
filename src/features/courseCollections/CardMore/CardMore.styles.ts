import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 24px",
        borderRadius: 16,
        backgroundColor: theme.colors.secondary8[0],
        cursor: "pointer"
    },
    iconButtonLinkCourse: {
        height: 18,
        width: 18,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.dark[0],

        svg: {
            width: 9,
            color: theme.colors.secondaryHover[0],
            strokeWidth: 5,
        },
    },
}));
