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
}));
