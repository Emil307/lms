import { MantineTheme, createStyles } from "@mantine/core";
import { AdminGroupStudentStatusName } from "@entities/group";

interface UseCellStylesProps {
    statusType?: AdminGroupStudentStatusName;
}

export default createStyles((theme) => ({
    headingContainer: {
        alignItems: "center",
        gap: 48,
        marginBottom: 32,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
            gap: 16,
        },
    },
}));

export const useCellStyles = createStyles((theme, { statusType }: UseCellStylesProps) => ({
    headingContainer: {
        alignItems: "center",
        gap: 48,

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
            gap: 16,
        },
    },
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: UseCellStylesProps) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };

        case "notStarted":
            return { backgroundColor: theme.colors.warning20[0], color: theme.colors.warning[0] };

        case "completed":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };

        default:
            return { backgroundColor: theme.colors.neutralGray100[0], color: theme.colors.neutralMain50[0] };
    }
};
