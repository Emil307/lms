import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        padding: 35,
        borderRadius: 32,
        border: `1px solid ${theme.colors.grayLight[0]}`,
        transition: "all 0.1s",
        cursor: "pointer",
        ":hover": {
            border: `none`,
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    content: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap-reverse",
        minHeight: 136,
        gap: 32,
    },
    imageContent: {
        height: 264,
        position: "relative",
        borderRadius: 32,
        overflow: "hidden",
    },
    courseInfo: {
        padding: 24,
        width: "100%",
        flexDirection: "column-reverse",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        zIndex: 1,
        button: {
            backgroundColor: theme.colors.neutralLight[0],
            borderRadius: 8,
            padding: "6px 10px",
            color: theme.colors.dark,
        },
    },
}));
