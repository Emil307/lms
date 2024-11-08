import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        paddingRight: 0,
        paddingLeft: 0,

        [theme.fn.smallerThan("md")]: {
            marginTop: 0,
            paddingRight: 16,
            paddingLeft: 16,
        },
    },
}));
