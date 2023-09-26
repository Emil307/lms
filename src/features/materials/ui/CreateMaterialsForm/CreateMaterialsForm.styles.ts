import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    fileInputContainerFiles: {
        height: 272,
        marginBottom: 24,
        marginTop: "16px !important",
        overflowY: "auto",

        [theme.fn.smallerThan("xs")]: {
            height: "calc(100vh - 426px)",
        },
    },
}));
