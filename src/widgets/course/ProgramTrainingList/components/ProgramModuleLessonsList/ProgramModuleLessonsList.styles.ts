import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    listItem: {
        ".mantine-List-itemWrapper": {
            span: {
                display: "flex",
                flexWrap: "wrap",

                [theme.fn.smallerThan("xs")]: {
                    flexDirection: "column",
                },
            },
        },
    },
}));
