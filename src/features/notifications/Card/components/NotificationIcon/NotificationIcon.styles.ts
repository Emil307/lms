import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    avatarDefaultIconWrapper: {
        width: "auto",
        height: "auto",
        minWidth: "auto",
        border: "none",
        svg: {
            transform: "scale(0.4)",
        },
    },
    wrapperPaymentIcon: {
        width: 32,
        height: 32,
        border: "none",
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16[0],
        color: theme.colors.secondary[0],

        svg: {
            width: 18,
            height: 18,
            strokeWidth: 1.5,
        },
    },

    wrapperHomeworkIcon: {
        width: 32,
        height: 32,
        border: "none",
        borderRadius: 56,
        backgroundColor: theme.colors.info16[0],
    },

    wrapperUnlockCourseIcon: {
        width: 32,
        height: 32,
        border: "none",
        borderRadius: 56,
        backgroundColor: theme.colors.done16[0],
        color: theme.colors.done[0],

        svg: {
            width: 18,
            height: 18,
            strokeWidth: 1.5,
        },
    },

    wrapperUnlockFreeCourseIcon: {
        width: 32,
        height: 32,
        border: "none",
        borderRadius: 56,
        backgroundColor: theme.colors.error16[0],
        color: theme.colors.errorDark[0],

        svg: {
            width: 18,
            height: 18,
            strokeWidth: 1.5,
        },
    },
}));
