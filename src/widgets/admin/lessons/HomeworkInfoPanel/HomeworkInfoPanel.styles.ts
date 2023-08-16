import { createStyles, MantineTheme } from "@mantine/core";
import { HomeworkAnswerStatusName } from "@entities/lesson";

interface CreateStylesProps {
    status: HomeworkAnswerStatusName;
}

export default createStyles((theme, { status }: CreateStylesProps) => ({
    infoPanel: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 24,
        overflowX: "auto",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            gap: 24,
        },
    },
    item: {
        alignItems: "center",
        gap: 8,
    },
    status: {
        borderRadius: 32,
        padding: "8px 12px",
        ...getStatusStyle(theme, status),
    },
}));

const getStatusStyle = (theme: MantineTheme, status: HomeworkAnswerStatusName) => {
    switch (status) {
        case "onReview":
            return {
                backgroundColor: theme.colors.error16[0],
                p: {
                    color: theme.colors.errorDark[0],
                },
            };
        case "needsEdit":
            return {
                backgroundColor: theme.colors.warning16[0],
                p: {
                    color: theme.colors.warning[0],
                },
            };
        default:
            return null;
    }
};
