import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    blockWrapper: {
        backgroundColor: theme.colors.neutralLight[0],
        marginTop: 112,
        padding: 96,
        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    blockContainer: {
        backgroundColor: theme.colors.white[0],
        maxWidth: 1320,
        width: "100%",
        margin: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 56px 56px 56px",
        borderRadius: 32,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column-reverse",
            padding: 24,
        },
    },
    image: {
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
        borderTop: `1px solid ${theme.colors.grayLight[0]}`,
        paddingTop: 25,
        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
}));
