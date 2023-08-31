import { MantineTheme, createStyles } from "@mantine/core";
import { HomeworkStatusName, LessonStatusName, TestStatusName } from "@entities/group";

interface CreateStylesProps {
    testStatus?: TestStatusName;
    homeworkStatus?: HomeworkStatusName;
    lessonStatus?: LessonStatusName;
}

export default createStyles((theme, { testStatus, homeworkStatus, lessonStatus }: CreateStylesProps) => ({
    lesson: {
        gap: 32,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        backgroundColor: theme.colors.white[0],
        borderRadius: 8,

        [theme.fn.smallerThan("md")]: {
            alignItems: "flex-start",
            gap: 16,
            flexDirection: "column",
        },
    },
    results: {
        columnGap: 32,
        rowGap: 16,
        alignItems: "center",

        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap",
        },
    },
    resultsMain: {
        columnGap: 16,
        rowGap: 8,
        alignItems: "center",

        [theme.fn.smallerThan("md")]: {
            flexWrap: "wrap",
        },
    },
    resultItem: {
        gap: 8,
        alignItems: "center",
    },
    testResult: {
        width: 97,
        color: getTestStatusColor(theme, { testStatus }),

        [theme.fn.smallerThan("md")]: {
            width: "fit-content",
        },
    },
    homeworkResult: {
        width: 97,
        color: getHomeworkStatusColor(theme, { homeworkStatus }),

        [theme.fn.smallerThan("md")]: {
            width: "fit-content",
        },
    },
    lessonResult: {
        minWidth: 107,
        padding: "6px 10px",
        borderRadius: 32,
        backgroundColor: getLessonStatusColor(theme, { lessonStatus }),

        ".mantine-Badge-inner": {
            display: "flex",
            alignItems: "center",
            gap: 4,
        },
    },
    lessonResultIcon: {
        color: getLessonStatusTextColor(theme, { lessonStatus }),
    },
    lessonResultText: {
        color: getLessonStatusTextColor(theme, { lessonStatus }),
    },
}));

const getTestStatusColor = (theme: MantineTheme, { testStatus }: Pick<CreateStylesProps, "testStatus">) => {
    switch (testStatus) {
        case "notStarted":
            return theme.colors.warning[0];
        case "needsEdit":
            return theme.colors.info[0];
        case "completed":
            return theme.colors.done[0];
        default:
            return theme.colors.dark[0];
    }
};

const getHomeworkStatusColor = (theme: MantineTheme, { homeworkStatus }: Pick<CreateStylesProps, "homeworkStatus">) => {
    switch (homeworkStatus) {
        case "notAttempted":
            return theme.colors.warning[0];
        case "needsEdit":
            return theme.colors.info[0];
        case "onReview":
            return theme.colors.error[0];
        case "completed":
            return theme.colors.done[0];
        default:
            return theme.colors.dark[0];
    }
};

const getLessonStatusColor = (theme: MantineTheme, { lessonStatus }: Pick<CreateStylesProps, "lessonStatus">) => {
    switch (lessonStatus) {
        case "blocked":
            return theme.colors.neutralLight[0];
        case "inProgress":
            return theme.colors.warning16[0];
        case "completed":
            return theme.colors.done16[0];
        default:
            return theme.colors.neutralLight[0];
    }
};

const getLessonStatusTextColor = (theme: MantineTheme, { lessonStatus }: Pick<CreateStylesProps, "lessonStatus">) => {
    switch (lessonStatus) {
        case "blocked":
            return theme.colors.gray45[0];
        case "inProgress":
            return theme.colors.warning[0];
        case "completed":
            return theme.colors.done[0];
        default:
            return theme.colors.gray45[0];
    }
};
