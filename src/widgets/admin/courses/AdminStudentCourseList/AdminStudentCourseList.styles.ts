import { MantineTheme, createStyles } from "@mantine/core";
import { AdminStudentCourseStatusType } from "@entities/course";

interface UserCellStylesParams {
    statusType?: AdminStudentCourseStatusType;
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

export const useCellStyles = createStyles((theme, { statusType }: UserCellStylesParams) => ({
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: UserCellStylesParams) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };
        case "notStarted":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };
        case "completed":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
        default:
            return { backgroundColor: theme.colors.neutralGray100[0], color: theme.colors.neutralMain50[0] };
    }
};
