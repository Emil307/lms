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

        [theme.fn.smallerThan("md")]: {
            padding: 24,
        },
    },
    contentBody: {
        gap: 48,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column-reverse",
        },
    },
    contentBodyLeftContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 24,
    },
    status: {
        ...getColorsByStatus(theme, { status }),
    },
    category: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.dark[0],
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 424,
        height: 260,
        borderRadius: 16,
        backgroundColor: theme.colors.grayLight[0],

        [theme.fn.smallerThan("md")]: {
            width: 350,
            height: 215,
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            maxWidth: 295,
            height: 181,
        },
    },
    descriptionContainer: {
        flexDirection: "column",
        marginTop: 32,
        gap: 8,
        wordBreak: "break-word",
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
