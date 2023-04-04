import { createStyles, MantineTheme } from "@mantine/core";

export default createStyles((theme, { isNew, inProgress }: { isNew: boolean; inProgress: boolean }) => ({
    root: {
        display: "flex",
        alignItems: "start",
        flexWrap: "wrap-reverse",
        margin: "0 !important",
        gap: 16,
    },
    imageWrapper: {
        position: "relative",
        overflow: "hidden",
        width: 96,
        height: 96,
        borderRadius: 12,
    },
    status: {
        width: "min-content",
        height: "auto",
        padding: "6px 10px",
        border: "none",
        borderRadius: 32,
        fontWeight: 500,
        fontSize: 12,
        lineHeight: "16px",
        textTransform: "inherit",
        ...getColorsByStatus(theme, { isNew, inProgress }),
    },
    endDate: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color: theme.colors.dark[0],
    },
}));

const getColorsByStatus = (theme: MantineTheme, { isNew, inProgress }: { isNew: boolean; inProgress: boolean }) => {
    if (inProgress) return { backgroundColor: theme.colors.info16[0], color: theme.colors.info[0] };

    if (isNew) {
        return { backgroundColor: theme.colors.error16[0], color: theme.colors.errorDark[0] };
    }
    return { backgroundColor: theme.colors.done16[0], color: theme.colors.doneDark[0] };
};
