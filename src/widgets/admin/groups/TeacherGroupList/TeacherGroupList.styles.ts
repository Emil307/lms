import { MantineTheme, createStyles } from "@mantine/core";
import { AdminGroupStatusType } from "@entities/group";

interface CreateStylesProps {
    statusType?: AdminGroupStatusType;
}

export default createStyles((theme, { statusType }: CreateStylesProps) => ({
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

        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: CreateStylesProps) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "notStarted":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        default:
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
    }
};