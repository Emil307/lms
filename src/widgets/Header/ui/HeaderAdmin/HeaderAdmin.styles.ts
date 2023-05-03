import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        position: "static",
        marginLeft: 280,
        padding: "32px 0px 32px 0px",
        border: "none",
        backgroundColor: "inherit",
        height: 104,
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
