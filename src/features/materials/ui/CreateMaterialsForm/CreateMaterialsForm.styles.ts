import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fileInputWrapper: {
        height: 472,
        marginBottom: 16,

        [theme.fn.smallerThan("xs")]: {
            height: 560,
        },
    },
    fileInputContainerFiles: {
        overflow: "auto",
        height: 270,

        [theme.fn.smallerThan("xs")]: {
            height: 354,
        },
    },
}));
