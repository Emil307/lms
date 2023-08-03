import { MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesParams {
    status: string;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        width: "100%",
        padding: 32,
        borderRadius: 24,
        backgroundColor: theme.colors.white[0],
    },
    status: {
        ...getColorsByStatus(theme, { status }),
    },
    category: {
        backgroundColor: theme.colors.light[0],
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
        color: theme.colors.gray45[0],
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
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };

        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "completed":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        default:
            return { backgroundColor: theme.colors.grayLight[0], color: theme.colors.gray45[0] };
    }
};
