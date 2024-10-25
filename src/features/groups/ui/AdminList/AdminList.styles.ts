import { MantineTheme, createStyles } from "@mantine/core";
import { AdminGroupStatusType } from "@entities/group";

interface UseCellStylesProps {
    statusType?: AdminGroupStatusType;
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
        width: 512,

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

export const useCellStyles = createStyles((theme, { statusType }: UseCellStylesProps) => ({
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: UseCellStylesProps) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };

        case "notStarted":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };

        default:
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
    }
};
