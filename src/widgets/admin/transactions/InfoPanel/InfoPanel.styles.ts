import { MantineTheme, createStyles } from "@mantine/core";
import { AdminTransactionStatus } from "@entities/transaction";

interface CreateStylesProps {
    status?: AdminTransactionStatus;
}

export default createStyles((theme, { status }: CreateStylesProps) => ({
    status: {
        ...getColorsByStatus(theme, { status }),
    },
    infoItem: {
        alignSelf: "center",
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.gray45[0],
        span: {
            color: theme.colors.dark[0],
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
