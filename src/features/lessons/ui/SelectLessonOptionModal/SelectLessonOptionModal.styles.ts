import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    description: {
        marginTop: -16,
        marginBottom: 24,

        [theme.fn.smallerThan("sm")]: {
            marginTop: 0,
        },
    },
    content: {
        gap: 24,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },
    card: {
        flex: 1,
        gap: 16,
        justifyContent: "space-between",
        padding: 24,
        backgroundColor: theme.colors.neutralGray100[0],
        borderRadius: "16px",
    },
    cardContent: {
        gap: 48,
        alignItems: "flex-start",
        flexDirection: "column",

        [theme.fn.smallerThan("xs")]: {
            gap: 24,
        },
    },
    wrapperIcon: {
        display: "flex",
        alignItems: "center",
        alignSelf: "self-start",
        justifyContent: "center",
        minWidth: 64,
        minHeight: 64,
        borderRadius: 24,
        backgroundColor: theme.colors.neutralWhite[0],

        svg: {
            width: 32,
            height: 32,
        },
    },
}));
