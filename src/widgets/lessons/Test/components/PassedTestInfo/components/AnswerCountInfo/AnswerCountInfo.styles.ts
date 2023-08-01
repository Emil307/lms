import { MantineTheme, createStyles } from "@mantine/core";

interface CreateStylesParams {
    fieldName: string;
}

export default createStyles((theme, { fieldName }: CreateStylesParams) => ({
    root: {
        alignItems: "center",
        gap: 16,
    },
    iconWrapper: {
        padding: 12,
        borderRadius: 56,

        ...getColorsByFieldName(theme, { fieldName }),
    },
}));

const getColorsByFieldName = (theme: MantineTheme, { fieldName }: CreateStylesParams) => {
    switch (fieldName) {
        case "correctAnswersCount":
            return { backgroundColor: theme.colors.done16[0], color: theme.colors.done[0] };

        case "wrongAnswersCount":
            return { backgroundColor: theme.colors.warning16[0], color: theme.colors.warning[0] };

        default:
            return { backgroundColor: theme.colors.secondary16[0], color: theme.colors.secondary[0] };
    }
};
