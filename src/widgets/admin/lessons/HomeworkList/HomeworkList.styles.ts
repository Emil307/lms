import { createStyles, MantineTheme } from "@mantine/core";
import { HomeworkAnswerStatusName } from "@entities/lesson";

interface UseCellStylesParams {
    status?: HomeworkAnswerStatusName;
}

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    filterSearchAndSelects: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    filterSearch: {
        width: 382,

        [theme.fn.smallerThan("sm")]: {
            width: 512,
        },

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterSelect: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterDateRangePicker: {
        width: 252,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterRadioGroup: {
        [theme.fn.smallerThan("sm")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },
}));

export const useCellStyles = createStyles((theme, { status }: UseCellStylesParams) => ({
    status: {
        borderRadius: 32,
        padding: "8px 12px",
        ...getStatusStyle(theme, status),
    },
}));

const getStatusStyle = (theme: MantineTheme, status?: HomeworkAnswerStatusName) => {
    switch (status) {
        case "onReview":
            return {
                backgroundColor: theme.colors.error16[0],
                color: theme.colors.errorDark[0],
            };
        case "needsEdit":
            return {
                backgroundColor: theme.colors.warning16[0],
                color: theme.colors.warning[0],
            };
        case "completed":
            return {
                backgroundColor: theme.colors.done16[0],
                color: theme.colors.done[0],
            };
        default:
            return null;
    }
};
