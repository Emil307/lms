import { MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesParams {
    status?: string;
    openedHomeworkDetails?: boolean;
}

export default createStyles((theme, { status, openedHomeworkDetails }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        paddingBottom: 56,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralWhite[0],
    },
    headingContainer: {
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 32,
        rowGap: 16,

        [theme.fn.smallerThan("xs")]: {
            alignItems: "flex-start",
            flexDirection: "column",
        },
    },
    headingTextContainer: {
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            justifyContent: "space-between",
        },
    },
    status: {
        overflow: "initial",
        height: "fit-content",
        ...getColorsByStatus(theme, { status }),
    },

    buttonToggle: {
        width: "min-content",

        ".mantine-Button-rightIcon": {
            transform: `rotate(${openedHomeworkDetails ? 0 : 180}deg)`,
        },
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "needsEdit":
            return { backgroundColor: theme.colors.warning20[0], color: theme.colors.warning[0] };

        case "completed":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };

        case "onReview":
            return { backgroundColor: theme.colors.error20[0], color: theme.colors.errorDark[0] };

        default:
            return { backgroundColor: theme.colors.neutralGray200[0], color: theme.colors.neutralMain50[0] };
    }
};
