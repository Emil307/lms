import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    questionsWrapper: {
        gap: 16,
        flexDirection: "column",

        [theme.fn.smallerThan("sm")]: {
            gap: 48,
        },
    },
}));
