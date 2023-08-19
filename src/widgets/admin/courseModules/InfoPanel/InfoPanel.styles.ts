import { createStyles } from "@mantine/core";

export default createStyles(() => ({
    wrapper: {
        marginTop: 24,
        gap: 32,
        overflowX: "auto",
        alignItems: "center",

        "::-webkit-scrollbar": {
            display: "none",
        },
    },
    item: {
        gap: 8,
        alignItems: "center",
        whiteSpace: "nowrap",
    },
}));
