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
        gap: 24,

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
        },
    },
}));
