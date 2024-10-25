import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    category: {
        backgroundColor: theme.colors.neutralGray100[0],
        color: theme.colors.dark[0],
    },
    ratingValue: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    ratingMaxValue: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.neutralMain50[0],
    },
    reviewInfo: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "24px",
        color: theme.colors.dark[0],
    },
    dividerDot: {
        alignSelf: "center",
        height: 4,
        borderLeftColor: theme.colors.dark[0],
        borderLeftStyle: "dotted",
    },
}));
