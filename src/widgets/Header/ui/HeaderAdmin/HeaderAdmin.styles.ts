import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "@shared/constant";

export default createStyles((theme) => ({
    root: {
        display: "flex",
        gap: 24,
        position: "sticky",
        top: 0,
        left: 0,
        maxHeight: HEADER_HEIGHT,
        padding: "16px 0 16px 24px",
        border: "none",
        backgroundColor: theme.colors.light[0],
        zIndex: 200,
    },
    logoWrapper: {
        minWidth: 232,
        height: 72,
    },
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.65)",
        },
    },
    fullUserName: {
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    roleName: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    buttonIcon: {
        width: 56,
        height: 40,
        borderRadius: 160,
        color: theme.colors.dark[0],
        backgroundColor: theme.colors.white[0],

        ":hover": {
            color: theme.colors.secondary[0],
            backgroundColor: theme.colors.grayLight[0],
        },

        ":active": {
            color: theme.colors.dark[0],
            backgroundColor: theme.colors.grayLight[0],
        },
    },
}));
