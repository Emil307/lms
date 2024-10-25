import { createStyles, MantineTheme } from "@mantine/core";
import { GroupStatusName } from "@entities/group";

interface CreateStylesParams {
    status: GroupStatusName;
}

export default createStyles((theme, { status }: CreateStylesParams) => ({
    root: {
        display: "flex",
        alignItems: "start",
        flexWrap: "wrap-reverse",
        margin: "0 !important",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },
    contentWrapper: {
        flex: 1,
        flexDirection: "column",
        minHeight: 124,
        gap: 8,
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: theme.colors.neutralGray200[0],
    },
    status: {
        width: "min-content",
        ...getColorsByStatus(theme, { status }),
    },
    iconCalendarWrapper: {
        minWidth: 32,
        height: 32,
        borderRadius: 56,
        backgroundColor: theme.colors.secondary16,
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.error20[0], color: theme.colors.errorDark[0] };

        case "inProgress":
            return { backgroundColor: theme.colors.info20[0], color: theme.colors.info[0] };

        case "completed":
            return { backgroundColor: theme.colors.done20[0], color: theme.colors.secondaryHover[0] };

        default:
            break;
    }
};
