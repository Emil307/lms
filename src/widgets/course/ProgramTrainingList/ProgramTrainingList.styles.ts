import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        width: "100%",
    },
    containerAboutCourse: {
        padding: "24px 32px",
        borderRadius: 16,
        columnGap: 56,
        backgroundColor: theme.colors.grayLight[0],
    },
    aboutCourseLabel: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
    },
    aboutCourseValue: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },

    countLessons: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
    countPractice: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));
