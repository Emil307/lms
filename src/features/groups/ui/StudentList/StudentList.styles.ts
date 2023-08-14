import { MantineTheme, createStyles } from "@mantine/core";
import { AdminGroupStudentStatusName } from "@entities/group";

interface CreateStylesProps {
    statusType?: AdminGroupStudentStatusName;
}

export default createStyles((theme, { statusType }: CreateStylesProps) => ({
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: CreateStylesProps) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "notStarted":
            return { backgroundColor: theme.colors.warning16[0], color: theme.colors.warning[0] };

        case "completed":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };

        default:
            return { backgroundColor: theme.colors.light[0], color: theme.colors.gray45[0] };
    }
};
