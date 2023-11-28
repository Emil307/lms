import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarWrapper: {
        width: 32,
        minWidth: 32,
        height: 32,
        borderRadius: 160,

        ".mantine-Avatar-placeholder": {
            backgroundColor: theme.colors.grayLight[0],
        },
    },
    avatarDefaultIconWrapper: {
        svg: {
            transform: "scale(0.4)",
        },
    },
    invoiceForPaymentIcon: {
        width: 32,
        height: 32,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.secondary[0],

        svg: {
            width: 18,
            height: 18,
            strokeWidth: 1.5,
        },
    },

    homeworkIcon: {
        width: 32,
        height: 32,
        borderRadius: 56,
        backgroundColor: theme.colors.info16[0],
    },

    groupAddedIcon: {
        width: 32,
        height: 32,
        borderRadius: 56,
        backgroundColor: theme.colors.done16[0],
        color: theme.colors.done[0],

        svg: {
            width: 18,
            height: 18,
            strokeWidth: 1.5,
        },
    },
}));
