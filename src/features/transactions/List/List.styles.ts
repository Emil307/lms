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
        height: "auto",
        paddingInline: 10,
        paddingBlock: 6,
        border: "none",

        span: {
            fontWeight: 500,
            fontSize: 12,
            lineHeight: "16px",
        },

        ...getColorsByStatus(theme, { status }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesProps) => {
    switch (status) {
        case "new":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "paid":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        default:
            return { backgroundColor: theme.colors.light[0], color: theme.colors.gray45[0] };
    }
};