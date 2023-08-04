import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    card: {
        padding: 24,
        backgroundColor: theme.colors.white[0],
        borderRadius: 16,
    },
    schedule: {
        position: "relative",
    },
    scheduleDate: {
        width: 100,
        flexShrink: 0,
        paddingLeft: 10,

        "&:before": {
            content: "''",
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: 2,
            backgroundColor: theme.colors.secondary[0],
            borderRadius: 2,
        },
    },
    badge: {
        padding: "6px 10px",
        borderRadius: 60,
        backgroundColor: theme.colors.neutralLight[0],
    },
    courseButton: {
        height: "auto",
        span: {
            whiteSpace: "normal",
        },
    },
}));
