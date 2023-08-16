import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: "minmax(300px, 1162px) 334px",
        gridGap: 56,
        alignItems: "flex-start",

        [theme.fn.smallerThan("md")]: {
            gridTemplateColumns: "100%",

            "> div": {
                "&:last-child": {
                    maxWidth: 334,
                    width: "100%",
                    order: -1,
                },
            },
        },
    },
}));
