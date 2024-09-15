import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    image: {
        maxWidth: 1320,
        width: "100%",
        height: "auto",
        [theme.fn.smallerThan("sm")]: {
            padding: "0px 16px",
        },
    },
}));
