import { MantineTheme, createStyles } from "@mantine/core";
import { TransactionStatus } from "@entities/transaction";

interface CreateStylesProps {
    status?: TransactionStatus;
}

export default createStyles((theme, { status }: CreateStylesProps) => ({
    root: {
        padding: 24,
        borderRadius: 16,
        backgroundColor: theme.colors.white[0],
    },
    status: {
        ...getColorsByStatus(theme, { status }),
    },

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
        width: 418,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterSelect: {
        width: 205,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },

    filterDateRangePicker: {
        width: 205,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesProps) => {
    switch (status?.status) {
        case "new":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "paid":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        default:
            return { backgroundColor: theme.colors.light[0], color: theme.colors.gray45[0] };
    }
};
