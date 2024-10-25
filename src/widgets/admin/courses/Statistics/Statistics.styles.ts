import { MantineTheme, createStyles } from "@mantine/core";
import { AdminCourseGroupStatusName } from "@entities/course";

interface CreateStylesProps {
    statusType?: AdminCourseGroupStatusName;
}

export default createStyles((theme, { statusType }: CreateStylesProps) => ({
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: CreateStylesProps) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };
        case "notStarted":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };
        default:
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
    }
};
