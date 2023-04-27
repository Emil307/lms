import { createStyles } from "@mantine/core";

export default createStyles(() => ({
    container: {
        height: 420,
        width: "100%",
        "> div > ymaps:not(:last-child)": {
            display: "none",
        },
    },
}));
