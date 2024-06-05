import { MantineTheme, createStyles } from "@mantine/core";
import { LessonStatusName } from "@entities/group";

interface CreateStylesParams {
    status: LessonStatusName;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        padding: 16,
        gap: 16,
        borderRadius: 16,
        backgroundColor: status === "blocked" ? theme.colors.grayLight[0] : theme.colors.white[0],
    },
    status: {
        width: "min-content",
        height: 28,
        borderRadius: 32,

        ...getColorsByStatus(theme, { status }),
    },
    lockLessonInfo: {
        width: "min-content",
        height: 28,
        borderRadius: 32,
        color: theme.colors.gray45[0],
        backgroundColor: theme.colors.white[0],

        span: {
            display: "flex",
            gap: 8,
        },
    },
    wrapperLockIcon: {
        width: 16,
        height: 16,
        minHeight: 16,
        minWidth: 16,
        color: theme.colors.gray45[0],
    },
    lessonName: {
        cursor: status === "blocked" ? "text" : "pointer",
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };

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
