import { MantineTheme, createStyles } from "@mantine/core";
import { AdminGroupStatusType } from "@entities/group";

interface CreateStylesProps {
    statusType?: AdminGroupStatusType;
}

export default createStyles((theme, { statusType }: CreateStylesProps) => ({
    headingContainer: {
        alignItems: "center",
        marginBottom: 24,
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            flexWrap: "wrap",
        },
    },
    infoPanelListInfo: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        gap: 32,

        p: {
            whiteSpace: "nowrap",
        },

        "::-webkit-scrollbar": {
            display: "none",
        },

        [theme.fn.smallerThan("md")]: {
            gap: 24,
        },
    },
    status: {
        overflow: "initial",
        borderRadius: 32,

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
