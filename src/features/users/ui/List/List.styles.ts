import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    filterWrapper: {
        flexDirection: "column",
        gap: 16,

        [theme.fn.smallerThan("xs")]: {
            gap: 24,
        },
    },
    filterSearchAndRoleSelectContainer: {
        gap: 8,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    filterSearch: {
        width: 380,

        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
    filterRadioGroup: {
        [theme.fn.smallerThan("xs")]: {
            ".mantine-Group-root": {
                alignItems: "flex-start",
                flexDirection: "column",
            },

            // width: "100%",
        },
    },
}));
