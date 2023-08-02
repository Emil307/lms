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
        backgroundColor: theme.colors.white[0],
    },
    status: {
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
        case "needs_edit":
            return { backgroundColor: theme.colors.warning16[0], color: theme.colors.warning[0] };

        case "completed":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        case "on_review":
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };

        default:
            return { backgroundColor: theme.colors.grayLight[0], color: theme.colors.gray45[0] };
    }
};
