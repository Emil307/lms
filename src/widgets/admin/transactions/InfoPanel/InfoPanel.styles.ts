import { MantineTheme, createStyles } from "@mantine/core";
import { AdminTransactionStatus } from "@entities/transaction";

interface CreateStylesProps {
    status?: AdminTransactionStatus;
}

export default createStyles((theme, { status }: CreateStylesProps) => ({
    headingContainer: {
        alignItems: "center",
        marginBottom: 24,
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexWrap: "wrap",
        },
    },
    infoPanelListInfo: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
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
    status: {
        overflow: "initial",
        ...getColorsByStatus(theme, { status }),
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
