import { MantineTheme, createStyles } from "@mantine/core";
import { AdminTransactionStatus } from "@entities/transaction";

interface UseCellStylesProps {
    status?: AdminTransactionStatus;
}

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            gap: 24,
        },
    },
    filterDatePickerAndSelects: {
        flexWrap: "wrap",
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    filterDateRangePicker: {
        width: 252,

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
    buttons: {
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },
    button: {
        width: 164,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));

export const useCellStyles = createStyles((theme, { status }: UseCellStylesProps) => ({
    status: {
        ...getColorsByStatus(theme, { status }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: UseCellStylesProps) => {
    switch (status?.status) {
        case "new":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };

        case "paid":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };

        default:
            return { backgroundColor: theme.colors.neutralGray100[0], color: theme.colors.neutralMain50[0] };
    }
};
