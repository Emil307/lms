import { createStyles } from "@mantine/core";

export default createStyles(() => ({
    group: {
        flexDirection: "column",
        gap: 16,
    },
    listItems: {
        flexDirection: "column",
        gap: 8,
    },
    link: {
        width: "fit-content",
        wordBreak: "break-word",
    },
}));
