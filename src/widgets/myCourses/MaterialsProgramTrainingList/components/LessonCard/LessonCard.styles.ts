import { createStyles } from "@mantine/core";
import { LessonStatusName } from "@entities/group";

interface CreateStylesParams {
    status: LessonStatusName;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        padding: 24,
        gap: 32,
        borderRadius: 16,
        border: status === "blocked" ? "none" : `1px solid ${theme.colors.neutralGray200[0]}`,
        backgroundColor: status === "blocked" ? theme.colors.neutralGray200[0] : theme.colors.neutralWhite[0],

        [theme.fn.smallerThan("sm")]: {
            padding: 16,
        },
    },

    lockLessonInfo: {
        width: "min-content",
        height: 28,
        borderRadius: 32,
        color: theme.colors.neutralMain50[0],
        backgroundColor: theme.colors.neutralWhite[0],

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
        color: theme.colors.neutralMain50[0],
    },
}));
