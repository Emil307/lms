import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    editMode?: boolean;
}

export default createStyles((theme, { editMode }: CreateStylesProps) => ({
    wrapper: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: theme.colors.neutralLight[0],

        ...(editMode
            ? {
                  [theme.fn.smallerThan("sm")]: {
                      backgroundColor: theme.colors.white[0],
                      padding: 0,
                  },
              }
            : {
                  [theme.fn.smallerThan("xs")]: {
                      padding: "24px 16px",
                  },
              }),
    },
    heading: {
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,

        [theme.fn.smallerThan("sm")]: {
            justifyContent: "flex-start",
        },

        [theme.fn.smallerThan("xs")]: {
            justifyContent: "space-between",
        },
    },
    error: {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: "16px",
        marginTop: 8,
        color: theme.colors.warning[0],
    },
}));
