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
        justifyContent: "space-between",
        minHeight: 116,
        gap: 16,
    },

    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: theme.colors.darkGray[0],
    },
    category: {
        backgroundColor: theme.colors.light[0],
        color: theme.colors.dark[0],
    },
    status: {
        width: "min-content",
        ...getColorsByStatus(theme, { status }),
    },
}));

const getColorsByStatus = (theme: MantineTheme, { status }: CreateStylesParams) => {
    switch (status) {
        case "notStarted":
            return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };

        case "inProgress":
            return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

        case "completed":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };

        default:
            break;
    }
};
