import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            gap: 24,
        },
    },

    filterSearch: {
        width: 512,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterRadioGroup: {
        [theme.fn.smallerThan("sm")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },
        },
    },
}));
