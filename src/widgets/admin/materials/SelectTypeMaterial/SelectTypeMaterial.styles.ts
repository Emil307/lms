import { createStyles } from "@mantine/core";

interface CreateStylesProps {
    selectFromBase?: boolean;
}

export default createStyles((theme, { selectFromBase }: CreateStylesProps) => ({
    description: {
        marginTop: "-16px",
        marginBottom: 24,

        [theme.fn.smallerThan("xs")]: {
            marginTop: 0,
            marginBottom: 16,
        },
    },
    content: {
        display: "flex",
        flexWrap: "wrap",
        gap: 24,

        "& > *": {
            flex: "0 1 calc(50% - 12px)",
        },

        ...(selectFromBase
            ? {
                  [theme.fn.smallerThan("md")]: {
                      flexDirection: "column",
                  },
              }
            : {}),

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
            gap: 16,
            "& > *": {
                flex: "0 1 100%",
            },
        },
    },
}));
