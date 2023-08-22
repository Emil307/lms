import { MantineTheme, createStyles } from "@mantine/core";
import { LessonStatusName } from "@entities/group";
import { HomeworkAnswerStatusName, TestStatusName } from "@entities/lesson";

interface CreateStylesParams {
    status: LessonStatusName;
    testStatus?: TestStatusName;
    homeworkStatus?: HomeworkAnswerStatusName;
}

export default createStyles((theme, { status, testStatus, homeworkStatus }: CreateStylesParams) => ({
    root: {
        flexDirection: "column",
        width: "100%",
        padding: 24,
        gap: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    inner: {
        justifyContent: "space-between",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },
    testAndHomeworkInfo: {
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
            gap: 8,
        },
    },
    testInfo: {
        columnGap: 6,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    homeworkInfo: {
        columnGap: 6,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    status: {
        width: "min-content",
        height: 28,
        borderRadius: 32,
        ...getColorsByLessonStatus(theme, { status }),
    },
    testStatus: {
        ...getColorsByTestStatus(theme, { testStatus }),
    },
    homeworkStatus: {
        ...getColorsByHomeworkStatus(theme, { homeworkStatus }),
    },
}));

const getColorsByLessonStatus = (theme: MantineTheme, { status }: Pick<CreateStylesParams, "status">) => {
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

const getColorsByTestStatus = (theme: MantineTheme, { testStatus }: Pick<CreateStylesParams, "testStatus">) => {
    switch (testStatus) {
        case "completed":
            return { color: theme.colors.doneDark[0] };

        case "needsEdit":
            return { color: theme.colors.warning[0] };

        default:
            return { color: theme.colors.dark[0] };
    }
};

const getColorsByHomeworkStatus = (theme: MantineTheme, { homeworkStatus }: Pick<CreateStylesParams, "homeworkStatus">) => {
    switch (homeworkStatus) {
        case "completed":
            return { color: theme.colors.doneDark[0] };

        case "needsEdit":
            return { color: theme.colors.warning[0] };

        case "onReview":
            return { color: theme.colors.errorDark[0] };

        default:
            return { color: theme.colors.dark[0] };
    }
};
