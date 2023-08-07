import { MantineTheme, createStyles } from "@mantine/core";
import { LessonStatusName } from "@entities/group";

interface CreateStylesParams {
    status: LessonStatusName;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 24,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    status: {
        width: "min-content",
        height: 28,
        borderRadius: 32,
        ...getColorsByStatus(theme, { status }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "completed":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        case "onReview":
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };

        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        default:
            return { backgroundColor: theme.colors.light[0], color: theme.colors.gray45[0] };
    }
};
