import { MantineTheme, createStyles } from "@mantine/core";
import { TestStatusName } from "@entities/lesson";

interface CreateStylesParams {
    status?: TestStatusName;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        paddingBottom: 56,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.neutralWhite[0],
    },
    headingContainer: {
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    status: {
        ...getColorsByStatus(theme, { status }),
    },

    contentContainer: {
        padding: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray100[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 16,
        },
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "needsEdit":
            return { backgroundColor: theme.colors.warning20[0], color: theme.colors.warning[0] };

        case "completed":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };

        default:
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
    }
};
