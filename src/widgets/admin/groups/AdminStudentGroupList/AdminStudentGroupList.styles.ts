import { MantineTheme, createStyles } from "@mantine/core";
import { AdminStudentGroupStatusType } from "@entities/group";

interface UserCellStylesParams {
    statusType?: AdminStudentGroupStatusType;
}

export const useCellStyles = createStyles((theme, { statusType }: UserCellStylesParams) => ({
    status: {
        ...getColorsByStatus(theme, { statusType }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { statusType }: UserCellStylesParams) => {
    switch (statusType) {
        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };
        case "notStarted":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
        case "completed":
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
        default:
            return { backgroundColor: theme.colors.light[0], color: theme.colors.gray45[0] };
    }
};
