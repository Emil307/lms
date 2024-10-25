import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    title: {
        fontSize: 42,
        lineHeight: "46px",
    },
    blockWrapper: {
        backgroundColor: theme.colors.neutralGray100[0],
        marginTop: 112,
        padding: 96,
        [theme.fn.smallerThan("md")]: {
            padding: "64px 16px",
        },
    },
    blockContainer: {
        backgroundColor: theme.colors.neutralWhite[0],
        maxWidth: 1320,
        width: "100%",
        margin: "auto",
        justifyContent: "space-between",
        padding: "56px 56px 56px 56px",
        borderRadius: 32,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
            padding: 24,
        },
    },
    image: {
        height: 398,
        [theme.fn.smallerThan("md")]: {
            height: 272,
            objectFit: "cover",
            width: "auto",
            marginBottom: 48,
        },
    },
    priceContainer: {
        flexGrow: 1,
    },
    buyButtonContainer: {
        gap: 24,
        alignItems: "center",
        borderTop: `1px solid ${theme.colors.neutralGray200[0]}`,
        paddingTop: 25,
        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    button: {
        fontSize: 18,
        lineHeight: "24px",
    },
    description: {
        fontSize: 16,
        lineHeight: "22px",
    },
}));
