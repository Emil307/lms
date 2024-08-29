import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    drawer: {
        borderBottomLeftRadius: "32px",
        borderTopLeftRadius: "32px",
        [theme.fn.smallerThan("xs")]: {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
        },
    },
    body: {
        height: "83%",
        display: "flex",
        flexDirection: "column",
        padding: "0px 4px 20px 20px",
    },
    header: {
        height: "8.6%",
        padding: "0 20px",
    },
}));
