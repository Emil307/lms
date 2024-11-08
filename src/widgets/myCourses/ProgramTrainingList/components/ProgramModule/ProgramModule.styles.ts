import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        gap: 32,
        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },
    moduleNumber: {
        marginBottom: 8,
    },
    moduleName: {
        marginBottom: 16,
    },
    moduleBlockInfo: {
        flexDirection: "column",
        width: "100%",
        maxWidth: 424,
    },
    lessonsBlockInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 8,
    },
}));
