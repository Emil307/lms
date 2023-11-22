import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "264px calc(100% - 296px)",
        gap: 32,

        [theme.fn.smallerThan("md")]: {
            display: "flex",
            flexDirection: "column",
        },
    },
    wrapperContent: {
        flex: 1,
        flexDirection: "column",
        gap: 64,
    },
}));
