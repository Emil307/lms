import { createStyles } from "@mantine/core";

export default createStyles(() => ({
    container: {
        height: 420,
        width: "100%",
        borderRadius: 16,
        "> div > ymaps > ymaps > ymaps": {
            borderRadius: 16,
        },

        "> div > ymaps:not(:last-child)": {
            display: "none",
        },
    },
}));
